/**
 * @file patch-animation-descriptions.js
 * @description Seeds the animated-element accessibility descriptions into
 * every locale: `translations/<loc>/components.animations.<id>` gets
 * `{alt, longdesc}` records — a one-line accessible name plus the full
 * machine-readable description (element, animation, behavior, trigger,
 * tech stack, purpose) that screen readers, AI agents and SEO crawlers
 * consume via `aria-describedby`/`longdesc` + the hidden desc nodes
 * `core/utils/a11y/animation-desc.ts` injects.
 *
 * Writes database.json (the repo snapshot the build + English fallback
 * inline). With `--push`, additionally uploads the same nodes to
 * Firebase RTDB (`translations/<loc>/components/animations`) — requires
 * .firebase-admin-key.json in the project root.
 *
 * Usage: node shared/scripts/i18n/patch-animation-descriptions.js [--push]
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..', '..')
const dbPath = path.join(rootDir, 'database.json')

const DESCS = {
  en: {
    'progress-bar': {
      alt: 'Route progress bar crawling across the top during navigation',
      longdesc:
        'The thin progress bar fixed to the top edge of the viewport. Animation: a scaleX transform sweeps the bar from zero to about seventy percent over several seconds while a route change is in flight, then snaps to one hundred percent and fades out in place when the destination view resolves — it never visibly retracts. Trigger: starts on every internal navigation and completes when the new view mounts. Tech: CSS transitions on transform and opacity driven by two state classes — zero per-frame JavaScript. Purpose: communicates that a page transition is underway, nprogress-style.',
    },
    'burger-button': {
      alt: 'Hamburger menu button with liquid morph animation',
      longdesc:
        "The navigation hamburger button in the top-right corner of every page. Animation: liquid morph between the three-line burger glyph and the close X — the strokes bend and fuse like fluid rather than rotating rigidly. Trigger: plays on click/tap when the menu opens, reverses when it closes; hover shifts the stroke tension. Tech: a Rust/WASM-driven canvas widget (WebGL fragment shader) with a WebGPU/OffscreenCanvas worker variant and a pure-CSS line fallback. Purpose: communicates the menu's open/closed state through a tactile, physics-flavored transition.",
    },
    'nav-menu-background': {
      alt: 'Animated fullscreen menu backdrop with flowing contour field',
      longdesc:
        'The fullscreen backdrop painted behind the navigation menu overlay. Animation: a slow-moving fractal contour field — layered fbm noise ridges drift and reshape continuously, like heat-haze or plasma. Trigger: starts when the hamburger menu opens, stops and disposes when it closes. Tech: WebGL fragment shader (GLSL fbm) on a dedicated canvas, with a WebGPU/OffscreenCanvas worker-thread variant and a static CSS gradient fallback. Purpose: gives the menu a living, atmospheric depth instead of a flat color panel.',
    },
    'nav-menu': {
      alt: 'Navigation menu items with staggered rise entrance',
      longdesc:
        'The site navigation menu overlay that opens from the hamburger button. Animation: each menu item enters with a staggered rise-and-fade (nav-menu-item-in), sliding upward a few pixels while fading in; a membrane/plasma highlight drifts across the panel on a slow loop. Trigger: the entrance plays once per open, sequenced top-to-bottom; the membrane drift loops while the menu is open. Tech: CSS keyframes with per-item transition delays, zero JavaScript per frame. Purpose: sequences the links so the eye reads them in order instead of catching a single block flash.',
    },
    'nav-flag': {
      alt: 'Language flag icon with wave and pop-in animation',
      longdesc:
        'The small flag canvas beside the language label in the navigation bar. Animation: the flag cloth waves with a sine-displaced ripple, and the whole glyph pops in with a scale entrance (nav-flag-in) when the nav mounts or the locale changes. Tech: a canvas widget rendering the flag procedurally (split-country flags are composited), with the CSS keyframe handling the entrance. Purpose: marks the active locale with a flag that reads as fabric, not a flat icon.',
    },
    'switch-slider': {
      alt: 'Preference toggle with liquid thumb slide animation',
      longdesc:
        'The on/off toggle switches inside the preferences dialog (appearance, motion, effects settings). Animation: the thumb slides along the track with a liquid stretch — it elongates while travelling and snaps back at rest, like a droplet. Trigger: plays on click/tap or keyboard toggle. Tech: a WebGL/canvas widget (Rust/WASM-driven) painting the track and thumb, with a CSS fallback for no-WebGL engines. Purpose: makes binary state feel tactile and confirms the toggle landed.',
    },
    'theme-slider': {
      alt: 'Theme toggle with orbital day/night slide animation',
      longdesc:
        'The light/dark theme switch in the preferences dialog and navigation. Animation: the thumb travels like an orbital body — a day/night disc slides across the track while sun/moon glyphs crossfade inside it. Trigger: plays on toggle; also plays once on load when the stored theme differs from the default. Tech: a WebGL/canvas widget (Rust/WASM-driven) with a CSS fallback. Purpose: narrates the theme switch as a sunrise/sunset instead of a binary flip.',
    },
    'close-button': {
      alt: 'Close button with liquid fill and rotating X animation',
      longdesc:
        'The circular close button on modals and the expanded-media lightbox. Animation: on hover a liquid fill rises inside the circle while the X strokes rotate and tighten; on press the fill snaps. Trigger: hover/focus arms it, press releases. Tech: a WebGL/canvas widget (Rust/WASM-driven) with a plain-CSS fallback button underneath for no-WebGL engines. Purpose: gives the dismiss affordance a physical, satisfying press feel.',
    },
    skeleton: {
      alt: 'Loading skeleton with morphing cells and shimmer animation',
      longdesc:
        'The placeholder skeletons shown where content is still loading (media figures, text blocks, project tiles). Animation: glyph cells morph between 0/1 shapes while a sheen gradient travels left-to-right across the surface (skeleton-shimmer). Trigger: runs continuously while the content loads, then hands off to the real element. Tech: a canvas widget (Rust/WASM-driven cell morphing) plus the CSS shimmer keyframe. Purpose: signals "content is coming" with motion that previews the layout instead of a spinner.',
    },
    'intro-loader': {
      alt: 'Intro loader with counter-rotating rings and progress',
      longdesc:
        "The fullscreen boot loader shown while the site's first assets load. Animation: two rings spin in opposite directions (intro-loader-spin-cw/ccw) around a percent counter and localized stage messages. Trigger: runs from page load until the boot bundle is ready, then the whole loader fades and removes itself. Tech: CSS keyframes driving the rings; JS only reports progress. Purpose: keeps first paint alive and readable during the tier/polyfill boot sequence.",
    },
    'site-toast': {
      alt: 'Notification toast sliding in from the corner',
      longdesc:
        'The small notification toast that appears in a screen corner for events like copy confirmations and cookie actions. Animation: slides in from the edge while fading up (site-toast-in), holds, then exits by sliding back and fading out. Trigger: dispatched by app events (copy, storage notice, test notification). Tech: CSS keyframes on enter and a --closing modifier on exit. Purpose: draws the eye to a transient message without blocking interaction.',
    },
    'mosaic-burn': {
      alt: 'Portfolio tile title burning away in embers and reassembling',
      longdesc:
        "The title text on portfolio mosaic tiles in the featured-work wall. Animation: on hover the title's letters combust — erode edges, scorch trails and glowing ember particles consume the glyphs column by column, then the letters rebuild bottom-up through the same burn field when the pointer leaves or the hover retargets. Trigger: pointer hover enter/leave on the tile. Tech: a Rust/WASM particle simulation (mosaic-burn crate) running the erode/scorch/ember model on a canvas; a 2D-canvas path renders the same field when the GPU route is off, and both share one deterministic simulation. Purpose: turns the plain hover state into the site's signature fire effect.",
    },
    'mosaic-tile': {
      alt: 'Portfolio tile sliding to a new slot on a spring + border sheen',
      longdesc:
        "The project cards in the featured-work mosaic wall. Animation: when one card expands on hover, displaced neighbors slide to their repacked slots on a damped spring — an organic overshoot-settle curve (CSS linear() synthesized spring) rather than a linear glide; a light sheen periodically travels each tile's border. Trigger: hover-driven repack animates the displaced tiles; the border sheen loops gently. Tech: JS masonry pack + CSS transition on transform; the sheen is a canvas ring pass. Purpose: keeps the wall feeling liquid and alive as it rearranges.",
    },
    'media-progressive': {
      alt: 'Media image morphing from blurry low-quality to sharp high-quality',
      longdesc:
        "Every media figure across the site (project images and videos). Animation: a low-resolution placeholder paints first, then morphs into the decoded high-resolution asset — the high-res layer resolves out of the thumb's blurred/zoomed state rather than blinking in, so the eye reads a continuous sharpening. Trigger: starts when the figure scrolls into view (IntersectionObserver) and the full asset finishes its WASM-pool decode. Tech: off-thread WASM image decode, blob-URL swap and a CSS/canvas morph. Purpose: makes progressive loading feel like the image coming into focus instead of a hard replace.",
    },
    'glitch-portrait': {
      alt: 'About portrait with VHS glitch corruption animation',
      longdesc:
        "The portrait image on the About section. Animation: periodic VHS-style corruption — scanline rolls, channel splits, block displacement and noise bands sweep the photo briefly before it snaps back to clean. Trigger: runs on a randomized timer while the section is on screen. Tech: a WebGL fragment-shader pass on the portrait texture with a canvas fallback. Purpose: gives the portrait a living, analog-video personality matching the site's technical aesthetic.",
    },
    'divider-sheen': {
      alt: 'Footer divider with a traveling light sheen',
      longdesc:
        'The hairline dividers separating page sections and footer columns. Animation: a soft band of light travels slowly along the hairline, sweeping edge to edge in a continuous loop. Trigger: runs continuously while the divider is on screen. Tech: a canvas widget painting the line plus the moving gradient band. Purpose: lifts a static rule into a subtle "alive" detail.',
    },
    'text-draw': {
      alt: 'Text drawing itself letter by letter as if handwritten',
      longdesc:
        'Section titles, links and captions styled with the draw-text treatment across the site. Animation: each character is drawn pen-stroke style in reading order — strokes write on sequentially like handwriting or a plotter, with optional word-level grouping. Trigger: plays when the element scrolls into view (IntersectionObserver, viewport trigger) or on explicit dispatch. Tech: instanced per-character drawing on canvas (Rust/WASM text-draw widget) with a CSS keyframe fallback (char-draw/word-draw). Purpose: makes headings feel authored — written in front of you rather than stamped.',
    },
    'ring-sheen': {
      alt: 'Tile border with a light sheen travelling around the ring',
      longdesc:
        "The border outlines on mosaic and related-project tiles. Animation: a bright sheen band travels around the tile's border ring like light gliding over a picture frame, on a slow periodic loop. Trigger: loops while the tile is visible; intensifies on hover. Tech: a canvas ring pass composited over the tile border. Purpose: keeps static card grids alive with a low-cost ambient highlight.",
    },
    'corner-brackets': {
      alt: 'Button corner brackets expanding on hover',
      longdesc:
        'The corner-bracket decorations on action buttons (close bars, CTA buttons). Animation: the four corner brackets expand outward and brighten on hover, then contract back — like a camera-focus reticle locking. Trigger: hover/focus on the button. Tech: a small canvas widget per button (instanced bracket drawing) with a CSS transition fallback. Purpose: communicates interactivity with a precise, instrument-like focus cue.',
    },
    'scene-3d': {
      alt: 'Interactive 3D star-field and earth scene',
      longdesc:
        "The fullscreen 3D scenes — the star-field experiment (orbiting celestial bodies with dossier labels) and the earth playground (rotating planet with orbit controls). Animation: continuous physically-inspired motion — orbital mechanics, rotation, parallax on camera move, plus transition effects between bodies. Trigger: runs the whole time the scene is on screen; pointer/touch orbits the camera. Tech: three.js over WebGL/WebGPU with per-frame work kept on the GPU. Purpose: the site's flagship real-time 3D showcase.",
    },
    'genie-modal': {
      alt: 'Expanded media warping open like liquid into the lightbox',
      longdesc:
        "The expanded-media lightbox that opens when a project image or video is clicked. Animation: the media warps between the clicked figure's rectangle and the fullscreen modal box like a liquid sheet — horizontal strips lag, bow and stretch through a genie field while vapor particles shed off the moving fold; the same field collapses it back on close. Trigger: click/tap to open, close affordance or Escape to collapse. Tech: a WebGPU/Rust mesh-warp + particle widget on an off-main-thread worker when enabled, a zero-allocation 2D-canvas strip renderer everywhere else, and a CSS zoom keyframe as the last resort. Purpose: replaces a hard scale-fade with a physical, macOS-dock-style transition.",
    },
    carousel: {
      alt: 'Awards carousel gliding with momentum and progress fill',
      longdesc:
        'The horizontal awards carousel on the home footer. Animation: items glide with momentum and snap to position; a progress bar fills along the track, an autoplay dash animates the auto-advance timer, and action controls pop in. Trigger: drag/scroll gestures, prev/next controls and the autoplay timer. Tech: native scroll snapping plus JS-driven springs and CSS keyframes for chrome. Purpose: makes browsing the awards strip feel like shuffling physical cards.',
    },
    'about-text': {
      alt: 'About paragraph revealing its characters one by one',
      longdesc:
        'The biography paragraphs in the About section. Animation: the text reveals character by character in sentence order — each letter fades/moves in on its own schedule so the paragraph appears to write itself. Trigger: plays when the section scrolls into view. Tech: JS sequences per-character spans on rAF-driven timing, CSS handles the per-char transition. Purpose: gives the bio a typewriter/voice cadence matching the draw-text titles.',
    },
    'related-tile': {
      alt: 'Related project card lifting and zooming on hover',
      longdesc:
        'The related-project cards at the bottom of project pages. Animation: on hover the card lifts, its image zooms gently and title/description slide up — all on damped-spring easing (CSS linear() synthesized springs) so the motion overshoots slightly and settles organically; a border sheen sweeps the frame. Trigger: pointer hover/focus. Tech: CSS transitions on transform/opacity driven by spring easing curves. Purpose: makes the navigation affordance feel physical and inviting.',
    },
    'note-dot': {
      alt: 'Note marker pulsing softly',
      longdesc:
        'The small note/dot markers used on internals pages (documentation and project internals). Animation: the dot pulses softly — a gentle scale-and-fade breathing loop. Trigger: loops continuously while on screen. Tech: a CSS keyframe (note-dot-pulse). Purpose: marks the element as a live annotation without demanding attention.',
    },
    'body-glow': {
      alt: 'Ambient page glow drifting slowly behind content',
      longdesc:
        'The ambient background glow behind the page content. Animation: a large soft radial gradient drifts slowly across the document, shifting position and intensity in a long loop. Trigger: runs continuously on every page. Tech: a CSS keyframe (body-glow-drift) animating a fixed background layer — zero JavaScript. Purpose: gives the dark theme atmosphere and depth instead of a flat background.',
    },
  },
  br: {
    'progress-bar': {
      alt: 'Barra de progresso de rota percorrendo o topo durante a navegação',
      longdesc:
        'A barra fina de progresso fixa na borda superior da viewport. Animação: um transform scaleX varre a barra de zero até cerca de setenta por cento em alguns segundos enquanto a troca de rota está em andamento, depois completa até cem por cento e esmaece no lugar quando a view de destino resolve — ela nunca recua visivelmente. Gatilho: dispara em toda navegação interna e conclui quando a nova view monta. Tecnologia: transições CSS em transform e opacity dirigidas por duas classes de estado — zero JavaScript por frame. Propósito: comunicar que uma transição de página está em curso, no estilo nprogress.',
    },
    'burger-button': {
      alt: 'Botão do menu hambúrguer com animação de morph líquido',
      longdesc:
        'O botão de menu hambúrguer no canto superior direito de todas as páginas. Animação: morph líquido entre o ícone de três linhas e o X de fechar — os traços se curvam e se fundem como fluido, em vez de girar rigidamente. Gatilho: toca ao clicar/tocar quando o menu abre e reverte quando fecha; o hover altera a tensão dos traços. Tecnologia: widget em canvas dirigido por Rust/WASM (shader de fragmento WebGL), com variante em worker WebGPU/OffscreenCanvas e fallback em CSS puro. Propósito: comunicar o estado aberto/fechado do menu com uma transição tátil e física.',
    },
    'nav-menu-background': {
      alt: 'Fundo animado de tela cheia do menu com campo de contornos fluido',
      longdesc:
        'O fundo de tela cheia pintado atrás do overlay do menu de navegação. Animação: um campo de contornos fractais em movimento lento — camadas de ruído fbm driftam e se remodelam continuamente, como miragem de calor ou plasma. Gatilho: inicia quando o menu hambúrguer abre, para e é descartado quando fecha. Tecnologia: shader de fragmento WebGL (fbm em GLSL) num canvas dedicado, com variante WebGPU/OffscreenCanvas em worker e fallback de gradiente CSS estático. Propósito: dar ao menu uma profundidade atmosférica viva em vez de um painel de cor chapada.',
    },
    'nav-menu': {
      alt: 'Itens do menu de navegação com entrada escalonada ascendente',
      longdesc:
        'O overlay do menu de navegação que abre pelo botão hambúrguer. Animação: cada item entra com subida e fade escalonados (nav-menu-item-in), deslizando alguns pixels para cima enquanto aparece; um destaque de membrana/plasma drifta pelo painel em loop lento. Gatilho: a entrada toca uma vez por abertura, sequenciada de cima para baixo; o drift da membrana faz loop enquanto o menu está aberto. Tecnologia: keyframes CSS com delays por item, zero JavaScript por frame. Propósito: sequenciar os links para o olho lê-los em ordem em vez de um flash único.',
    },
    'nav-flag': {
      alt: 'Ícone de bandeira do idioma com animação de onda e entrada',
      longdesc:
        'O pequeno canvas de bandeira ao lado do rótulo de idioma na barra de navegação. Animação: o tecido da bandeira ondula com uma ondulação senoidal e o glifo inteiro entra com escala (nav-flag-in) quando a nav monta ou o idioma muda. Tecnologia: widget canvas que renderiza a bandeira proceduralmente (bandeiras de países divididos são compostas), com o keyframe CSS cuidando da entrada. Propósito: marcar o idioma ativo com uma bandeira que parece tecido, não um ícone chapado.',
    },
    'switch-slider': {
      alt: 'Interruptor de preferência com deslize líquido do botão',
      longdesc:
        'Os interruptores liga/desliga dentro do diálogo de preferências (aparência, movimento, efeitos). Animação: o botão desliza pelo trilho com estiramento líquido — alonga-se durante o trajeto e volta ao repouso, como uma gota. Gatilho: toca ao clicar/tocar ou alternar pelo teclado. Tecnologia: widget WebGL/canvas (dirigido por Rust/WASM) pintando trilho e botão, com fallback CSS para motores sem WebGL. Propósito: dar tato ao estado binário e confirmar que a alternância aconteceu.',
    },
    'theme-slider': {
      alt: 'Alternador de tema com deslize orbital dia/noite',
      longdesc:
        'O interruptor de tema claro/escuro no diálogo de preferências e na navegação. Animação: o botão viaja como um corpo orbital — um disco dia/noite atravessa o trilho enquanto glifos de sol/lua fazem crossfade dentro dele. Gatilho: toca ao alternar; também toca uma vez na carga quando o tema salvo difere do padrão. Tecnologia: widget WebGL/canvas (dirigido por Rust/WASM) com fallback CSS. Propósito: narrar a troca de tema como um nascer/pôr do sol em vez de um flip binário.',
    },
    'close-button': {
      alt: 'Botão de fechar com preenchimento líquido e X giratório',
      longdesc:
        'O botão circular de fechar dos modais e do lightbox de mídia expandida. Animação: no hover um preenchimento líquido sobe dentro do círculo enquanto os traços do X giram e apertam; ao pressionar, o preenchimento trava. Gatilho: hover/foco arma, pressionar libera. Tecnologia: widget WebGL/canvas (dirigido por Rust/WASM) com um botão CSS simples por baixo para motores sem WebGL. Propósito: dar ao fechar uma sensação física e satisfatória de pressão.',
    },
    skeleton: {
      alt: 'Esqueleto de carregamento com células em morph e brilho',
      longdesc:
        'Os esqueletos de placeholder exibidos onde o conteúdo ainda carrega (figuras de mídia, blocos de texto, tiles de projeto). Animação: células de glifo fazem morph entre formas 0/1 enquanto um brilho em gradiente atravessa a superfície da esquerda para a direita (skeleton-shimmer). Gatilho: roda continuamente enquanto o conteúdo carrega, depois entrega ao elemento real. Tecnologia: widget canvas (morph de células dirigido por Rust/WASM) mais o keyframe CSS do shimmer. Propósito: sinalizar "o conteúdo está chegando" com movimento que antecipa o layout em vez de um spinner.',
    },
    'intro-loader': {
      alt: 'Loader de introdução com anéis contrarrotativos e progresso',
      longdesc:
        'O loader de boot em tela cheia exibido enquanto os primeiros assets do site carregam. Animação: dois anéis giram em direções opostas (intro-loader-spin-cw/ccw) ao redor de um contador de porcentagem e mensagens de estágio localizadas. Gatilho: roda do carregamento da página até o bundle de boot ficar pronto, quando o loader inteiro esmaece e se remove. Tecnologia: keyframes CSS girando os anéis; o JS apenas reporta progresso. Propósito: manter o primeiro paint vivo e legível durante a sequência de boot de tiers/polyfills.',
    },
    'site-toast': {
      alt: 'Toast de notificação deslizando do canto da tela',
      longdesc:
        'O pequeno toast de notificação que aparece num canto da tela para eventos como confirmações de cópia e ações de cookies. Animação: desliza da borda enquanto esmaece para cima (site-toast-in), segura e sai deslizando de volta com fade. Gatilho: disparado por eventos do app (cópia, aviso de armazenamento, notificação de teste). Tecnologia: keyframes CSS na entrada e um modificador --closing na saída. Propósito: chamar o olho para uma mensagem transitória sem bloquear a interação.',
    },
    'mosaic-burn': {
      alt: 'Título do tile de portfólio queimando em brasas e remontando',
      longdesc:
        'O texto do título nos tiles do mosaico de trabalhos em destaque. Animação: no hover as letras do título entram em combustão — bordas erodidas, trilhas de queima e partículas de brasa incandescente consomem os glifos coluna a coluna, e as letras se reconstroem de baixo para cima pelo mesmo campo de fogo quando o ponteiro sai ou o hover muda de alvo. Gatilho: hover com o ponteiro no tile. Tecnologia: simulação de partículas em Rust/WASM (crate mosaic-burn) rodando o modelo erode/scorch/ember num canvas; um caminho 2D-canvas renderiza o mesmo campo quando a rota GPU está desligada — ambos compartilham uma simulação determinística. Propósito: transformar o hover simples no efeito de fogo assinatura do site.',
    },
    'mosaic-tile': {
      alt: 'Tile de portfólio deslizando para novo slot com mola + brilho na borda',
      longdesc:
        'Os cards de projeto no mosaico de trabalhos em destaque. Animação: quando um card expande no hover, os vizinhos deslocados deslizam para seus novos slots com uma mola amortecida — uma curva orgânica de overshoot e assentamento (mola sintetizada em CSS linear()) em vez de um deslize linear; um brilho percorre periodicamente a borda de cada tile. Gatilho: o repack por hover anima os tiles deslocados; o brilho da borda faz loop suave. Tecnologia: pack masonry em JS + transição CSS em transform; o brilho é uma passada de anel em canvas. Propósito: manter a parede líquida e viva enquanto se rearranja.',
    },
    'media-progressive': {
      alt: 'Imagem de mídia indo de borrada em baixa qualidade para nítida em alta',
      longdesc:
        'Toda figura de mídia do site (imagens e vídeos dos projetos). Animação: um placeholder de baixa resolução pinta primeiro, depois faz morph para o asset de alta resolução decodificado — a camada de alta resolve a partir do estado borrado/ampliado da thumb em vez de piscar, então o olho lê uma nitidez contínua. Gatilho: começa quando a figura entra na viewport (IntersectionObserver) e o asset termina o decode no pool WASM. Tecnologia: decode de imagem WASM fora da thread principal, troca por blob-URL e morph em CSS/canvas. Propósito: fazer o carregamento progressivo parecer a imagem entrando em foco, não uma substituição dura.',
    },
    'glitch-portrait': {
      alt: 'Retrato do About com animação de corrupção glitch VHS',
      longdesc:
        'A imagem do retrato na seção About. Animação: corrupção periódica estilo VHS — rolos de scanline, separação de canais, deslocamento de blocos e faixas de ruído varrem a foto brevemente antes dela voltar limpa. Gatilho: roda num timer aleatório enquanto a seção está em tela. Tecnologia: passada de shader de fragmento WebGL na textura do retrato com fallback canvas. Propósito: dar ao retrato uma personalidade viva de vídeo analógico, no clima técnico do site.',
    },
    'divider-sheen': {
      alt: 'Divisor do rodapé com brilho de luz viajante',
      longdesc:
        'Os divisores hairline que separam seções de página e colunas do rodapé. Animação: uma faixa suave de luz viaja lentamente pelo fio, varrendo de ponta a ponta em loop contínuo. Gatilho: roda continuamente enquanto o divisor está em tela. Tecnologia: widget canvas pintando a linha mais a banda de gradiente em movimento. Propósito: elevar uma régua estática a um detalhe sutil e vivo.',
    },
    'text-draw': {
      alt: 'Texto se desenhando letra a letra como manuscrito',
      longdesc:
        'Títulos de seção, links e legendas com o tratamento draw-text em todo o site. Animação: cada caractere é desenhado estilo traço de caneta em ordem de leitura — os traços se escrevem sequencialmente como caligrafia ou plotter, com agrupamento opcional por palavra. Gatilho: toca quando o elemento entra na viewport (IntersectionObserver, gatilho de viewport) ou por dispatch explícito. Tecnologia: desenho instanciado por caractere em canvas (widget text-draw em Rust/WASM) com fallback em keyframe CSS (char-draw/word-draw). Propósito: fazer os títulos parecerem autografados — escritos diante de você em vez de carimbados.',
    },
    'ring-sheen': {
      alt: 'Borda de tile com brilho viajando pelo anel',
      longdesc:
        'Os contornos de borda nos tiles do mosaico e de projetos relacionados. Animação: uma banda de brilho viaja pelo anel da borda do tile como luz deslizando numa moldura, em loop periódico lento. Gatilho: faz loop enquanto o tile está visível; intensifica no hover. Tecnologia: passada de anel em canvas composta sobre a borda do tile. Propósito: manter grades de cards estáticas vivas com um destaque ambiente barato.',
    },
    'corner-brackets': {
      alt: 'Cantos de botão expandindo em colchetes no hover',
      longdesc:
        'As decorações de colchetes de canto nos botões de ação (barras de fechar, CTAs). Animação: os quatro colchetes de canto expandem para fora e clareiam no hover, depois contraem de volta — como um retículo de foco de câmera travando. Gatilho: hover/foco no botão. Tecnologia: pequeno widget canvas por botão (desenho instanciado de colchetes) com fallback em transição CSS. Propósito: comunicar interatividade com uma pista de foco precisa e instrumental.',
    },
    'scene-3d': {
      alt: 'Cena 3D interativa de campo estelar e terra',
      longdesc:
        'As cenas 3D em tela cheia — o experimento star-field (corpos celestes em órbita com etiquetas de dossiê) e o playground da terra (planeta girando com controles de órbita). Animação: movimento contínuo inspirado em física — mecânica orbital, rotação, paralaxe no movimento de câmera e transições entre corpos. Gatilho: roda todo o tempo em que a cena está em tela; ponteiro/toque orbita a câmera. Tecnologia: three.js sobre WebGL/WebGPU com trabalho por frame mantido na GPU. Propósito: a vitrine 3D em tempo real assinatura do site.',
    },
    'genie-modal': {
      alt: 'Mídia expandida abrindo em warp líquido para o lightbox',
      longdesc:
        'O lightbox de mídia expandida que abre ao clicar numa imagem ou vídeo de projeto. Animação: a mídia se deforma entre o retângulo da figura clicada e a caixa do modal em tela cheia como uma folha líquida — faixas horizontais atrasam, curvam e esticam por um campo genie enquanto partículas de vapor se desprendem da dobra em movimento; o mesmo campo a colapsa de volta ao fechar. Gatilho: clique/toque para abrir, botão de fechar ou Escape para colapsar. Tecnologia: widget WebGPU/Rust de mesh-warp + partículas num worker fora da thread principal quando ativado, um renderer 2D-canvas de faixas sem alocação por frame em todo o resto, e um keyframe CSS de zoom como último recurso. Propósito: substituir um scale-fade duro por uma transição física estilo dock do macOS.',
    },
    carousel: {
      alt: 'Carrossel de prêmios deslizando com momentum e barra de progresso',
      longdesc:
        'O carrossel horizontal de prêmios no rodapé da home. Animação: os itens deslizam com momentum e fazem snap na posição; uma barra de progresso preenche ao longo do trilho, um traço de autoplay anima o temporizador e os controles de ação surgem. Gatilho: gestos de arraste/scroll, controles anterior/próximo e o timer de autoplay. Tecnologia: scroll snapping nativo mais springs em JS e keyframes CSS para o chrome. Propósito: fazer folhear a faixa de prêmios parecer embaralhar cartas físicas.',
    },
    'about-text': {
      alt: 'Parágrafo do About revelando seus caracteres um a um',
      longdesc:
        'Os parágrafos de biografia na seção About. Animação: o texto se revela caractere a caractere na ordem das frases — cada letra esmaece/move no próprio tempo, então o parágrafo parece se escrever sozinho. Gatilho: toca quando a seção entra na viewport. Tecnologia: JS sequencia spans por caractere em timing dirigido por rAF; o CSS cuida da transição por caractere. Propósito: dar à bio uma cadência de máquina de escrever/voz combinando com os títulos draw-text.',
    },
    'related-tile': {
      alt: 'Card de projeto relacionado elevando e dando zoom no hover',
      longdesc:
        'Os cards de projetos relacionados no fim das páginas de projeto. Animação: no hover o card se eleva, a imagem dá um zoom suave e título/descrição sobem — tudo em easing de mola amortecida (springs sintetizados em CSS linear()) para o movimento passar levemente e assentar de forma orgânica; um brilho varre a borda do card. Gatilho: hover/foco do ponteiro. Tecnologia: transições CSS em transform/opacity dirigidas por curvas de mola. Propósito: fazer a affordance de navegação parecer física e convidativa.',
    },
    'note-dot': {
      alt: 'Marcador de nota pulsando suavemente',
      longdesc:
        'Os pequenos marcadores de nota/ponto usados nas páginas de internals (documentação e internas de projeto). Animação: o ponto pulsa suavemente — um loop respirante de escala e fade. Gatilho: faz loop continuamente em tela. Tecnologia: um keyframe CSS (note-dot-pulse). Propósito: marcar o elemento como anotação viva sem exigir atenção.',
    },
    'body-glow': {
      alt: 'Brilho ambiente da página driftando atrás do conteúdo',
      longdesc:
        'O brilho de fundo ambiente atrás do conteúdo da página. Animação: um grande gradiente radial suave drifta lentamente pelo documento, mudando posição e intensidade num loop longo. Gatilho: roda continuamente em todas as páginas. Tecnologia: um keyframe CSS (body-glow-drift) animando uma camada de fundo fixa — zero JavaScript. Propósito: dar atmosfera e profundidade ao tema escuro em vez de um fundo chapado.',
    },
  },
  es: {
    'progress-bar': {
      alt: 'Barra de progreso de ruta recorriendo el borde superior durante la navegación',
      longdesc:
        'La barra fina de progreso fija en el borde superior del viewport. Animación: un transform scaleX barre la barra de cero hasta aproximadamente setenta por ciento en varios segundos mientras el cambio de ruta está en vuelo, luego completa hasta cien por ciento y se desvanece en el lugar cuando la vista de destino resuelve — nunca retrocede visiblemente. Disparador: arranca en cada navegación interna y concluye cuando la nueva vista se monta. Tecnología: transiciones CSS en transform y opacity dirigidas por dos clases de estado — cero JavaScript por frame. Propósito: comunicar que una transición de página está en curso, al estilo nprogress.',
    },
    'burger-button': {
      alt: 'Botón de menú hamburguesa con animación de morph líquido',
      longdesc:
        'El botón de menú hamburguesa en la esquina superior derecha de cada página. Animación: morph líquido entre el glifo de tres líneas y la X de cierre — los trazos se curvan y se fusionan como fluido en vez de rotar rígidamente. Disparador: se reproduce al hacer clic/tocar cuando el menú abre y se revierte cuando cierra; el hover cambia la tensión de los trazos. Tecnología: widget canvas dirigido por Rust/WASM (shader de fragmento WebGL), con variante en worker WebGPU/OffscreenCanvas y fallback CSS puro. Propósito: comunicar el estado abierto/cerrado del menú con una transición táctil y física.',
    },
    'nav-menu-background': {
      alt: 'Fondo animado a pantalla completa del menú con campo de contornos fluido',
      longdesc:
        'El fondo a pantalla completa pintado detrás del overlay del menú de navegación. Animación: un campo de contornos fractales en movimiento lento — capas de ruido fbm derivan y se remodelan continuamente, como espejismo de calor o plasma. Disparador: inicia cuando el menú hamburguesa abre, se detiene y se descarta cuando cierra. Tecnología: shader de fragmento WebGL (fbm en GLSL) en un canvas dedicado, con variante WebGPU/OffscreenCanvas en worker y fallback de gradiente CSS estático. Propósito: dar al menú una profundidad atmosférica viva en lugar de un panel de color plano.',
    },
    'nav-menu': {
      alt: 'Ítems del menú de navegación con entrada ascendente escalonada',
      longdesc:
        'El overlay del menú de navegación que abre desde el botón hamburguesa. Animación: cada ítem entra con subida y fade escalonados (nav-menu-item-in), deslizándose unos píxeles hacia arriba mientras aparece; un destello de membrana/plasma deriva por el panel en un loop lento. Disparador: la entrada se reproduce una vez por apertura, secuenciada de arriba abajo; la deriva de la membrana hace loop mientras el menú está abierto. Tecnología: keyframes CSS con delays por ítem, cero JavaScript por frame. Propósito: secuenciar los enlaces para que el ojo los lea en orden en vez de un flash único.',
    },
    'nav-flag': {
      alt: 'Icono de bandera del idioma con animación de onda y entrada',
      longdesc:
        'El pequeño canvas de bandera junto a la etiqueta de idioma en la barra de navegación. Animación: la tela de la bandera ondula con un ripple senoidal y el glifo completo entra con escala (nav-flag-in) cuando la nav monta o cambia el idioma. Tecnología: widget canvas que renderiza la bandera proceduralmente (las banderas de países divididos se componen), con el keyframe CSS encargándose de la entrada. Propósito: marcar el idioma activo con una bandera que parece tela, no un icono plano.',
    },
    'switch-slider': {
      alt: 'Interruptor de preferencia con deslizamiento líquido del pulgar',
      longdesc:
        'Los interruptores de encendido/apagado dentro del diálogo de preferencias (apariencia, movimiento, efectos). Animación: el pulgar se desliza por el riel con estiramiento líquido — se alarga durante el trayecto y vuelve al reposo, como una gota. Disparador: se reproduce al hacer clic/tocar o alternar por teclado. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) pintando riel y pulgar, con fallback CSS para motores sin WebGL. Propósito: dar tacto al estado binario y confirmar que la alternancia ocurrió.',
    },
    'theme-slider': {
      alt: 'Alternador de tema con deslizamiento orbital día/noche',
      longdesc:
        'El interruptor de tema claro/oscuro en el diálogo de preferencias y la navegación. Animación: el pulgar viaja como un cuerpo orbital — un disco día/noche atraviesa el riel mientras glifos de sol/luna hacen crossfade dentro de él. Disparador: se reproduce al alternar; también una vez al cargar cuando el tema guardado difiere del predeterminado. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) con fallback CSS. Propósito: narrar el cambio de tema como un amanecer/atardecer en vez de un flip binario.',
    },
    'close-button': {
      alt: 'Botón de cerrar con relleno líquido y X giratoria',
      longdesc:
        'El botón circular de cerrar de los modales y del lightbox de medios expandido. Animación: en hover un relleno líquido sube dentro del círculo mientras los trazos de la X rotan y se tensan; al presionar, el relleno se traba. Disparador: hover/foco lo arma, presionar lo libera. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) con un botón CSS simple debajo para motores sin WebGL. Propósito: dar al cierre una sensación física y satisfactoria de presión.',
    },
    skeleton: {
      alt: 'Esqueleto de carga con celdas en morph y brillo',
      longdesc:
        'Los esqueletos de placeholder mostrados donde el contenido aún carga (figuras de medios, bloques de texto, tiles de proyecto). Animación: celdas de glifo hacen morph entre formas 0/1 mientras un brillo en gradiente atraviesa la superficie de izquierda a derecha (skeleton-shimmer). Disparador: corre continuamente mientras el contenido carga, luego entrega al elemento real. Tecnología: widget canvas (morph de celdas dirigido por Rust/WASM) más el keyframe CSS del shimmer. Propósito: señalar "el contenido llega" con movimiento que anticipa el layout en vez de un spinner.',
    },
    'intro-loader': {
      alt: 'Loader de introducción con anillos contrarrotativos y progreso',
      longdesc:
        'El loader de arranque a pantalla completa mostrado mientras cargan los primeros assets del sitio. Animación: dos anillos giran en direcciones opuestas (intro-loader-spin-cw/ccw) alrededor de un contador de porcentaje y mensajes de etapa localizados. Disparador: corre desde la carga de la página hasta que el bundle de arranque está listo, cuando el loader completo se desvanece y se retira. Tecnología: keyframes CSS girando los anillos; el JS solo reporta progreso. Propósito: mantener el primer paint vivo y legible durante la secuencia de arranque de tiers/polyfills.',
    },
    'site-toast': {
      alt: 'Toast de notificación deslizándose desde la esquina',
      longdesc:
        'El pequeño toast de notificación que aparece en una esquina de la pantalla para eventos como confirmaciones de copia y acciones de cookies. Animación: se desliza desde el borde mientras sube con fade (site-toast-in), se sostiene y sale deslizándose de vuelta con fade. Disparador: disparado por eventos de la app (copia, aviso de almacenamiento, notificación de prueba). Tecnología: keyframes CSS en la entrada y un modificador --closing en la salida. Propósito: atraer la vista a un mensaje transitorio sin bloquear la interacción.',
    },
    'mosaic-burn': {
      alt: 'Título del tile de portafolio quemándose en brasas y rearmándose',
      longdesc:
        'El texto del título en los tiles del mosaico de trabajos destacados. Animación: en hover las letras del título entran en combustión — bordes erosionados, estelas de quemado y partículas de brasa incandescente consumen los glifos columna a columna, y las letras se reconstruyen de abajo hacia arriba por el mismo campo de fuego cuando el puntero sale o el hover cambia de objetivo. Disparador: hover del puntero en el tile. Tecnología: simulación de partículas en Rust/WASM (crate mosaic-burn) corriendo el modelo erode/scorch/ember en un canvas; un camino 2D-canvas renderiza el mismo campo cuando la ruta GPU está apagada — ambos comparten una simulación determinística. Propósito: convertir el hover simple en el efecto de fuego insignia del sitio.',
    },
    'mosaic-tile': {
      alt: 'Tile de portafolio deslizándose a nuevo slot con resorte + brillo en el borde',
      longdesc:
        'Las tarjetas de proyecto en el mosaico de trabajos destacados. Animación: cuando una tarjeta se expande en hover, los vecinos desplazados se deslizan a sus nuevos slots con un resorte amortiguado — una curva orgánica de overshoot y asentamiento (resorte sintetizado en CSS linear()) en vez de un deslizamiento lineal; un brillo recorre periódicamente el borde de cada tile. Disparador: el repack por hover anima los tiles desplazados; el brillo del borde hace loop suave. Tecnología: pack masonry en JS + transición CSS en transform; el brillo es una pasada de anillo en canvas. Propósito: mantener la pared líquida y viva mientras se reordena.',
    },
    'media-progressive': {
      alt: 'Imagen de medios pasando de borrosa en baja calidad a nítida en alta',
      longdesc:
        'Cada figura de medios del sitio (imágenes y videos de los proyectos). Animación: un placeholder de baja resolución pinta primero, luego hace morph al asset de alta resolución decodificado — la capa de alta se resuelve desde el estado borroso/ampliado del thumb en vez de parpadear, así el ojo lee una nitidez continua. Disparador: empieza cuando la figura entra en la viewport (IntersectionObserver) y el asset termina su decode en el pool WASM. Tecnología: decode de imagen WASM fuera del hilo principal, cambio a blob-URL y morph en CSS/canvas. Propósito: hacer que la carga progresiva parezca la imagen entrando en foco, no un reemplazo duro.',
    },
    'glitch-portrait': {
      alt: 'Retrato del About con animación de corrupción glitch VHS',
      longdesc:
        'La imagen del retrato en la sección About. Animación: corrupción periódica estilo VHS — rollos de scanline, separación de canales, desplazamiento de bloques y bandas de ruido barren la foto brevemente antes de que vuelva limpia. Disparador: corre en un timer aleatorio mientras la sección está en pantalla. Tecnología: pasada de shader de fragmento WebGL en la textura del retrato con fallback canvas. Propósito: dar al retrato una personalidad viva de video analógico, acorde a la estética técnica del sitio.',
    },
    'divider-sheen': {
      alt: 'Divisor del pie con un brillo de luz viajero',
      longdesc:
        'Los divisores hairline que separan secciones de página y columnas del pie. Animación: una banda suave de luz viaja lentamente por el hilo, barriendo de punta a punta en loop continuo. Disparador: corre continuamente mientras el divisor está en pantalla. Tecnología: widget canvas pintando la línea más la banda de gradiente en movimiento. Propósito: elevar una regla estática a un detalle sutil y vivo.',
    },
    'text-draw': {
      alt: 'Texto dibujándose letra a letra como manuscrito',
      longdesc:
        'Títulos de sección, enlaces y leyendas con el tratamiento draw-text en todo el sitio. Animación: cada carácter se dibuja estilo trazo de pluma en orden de lectura — los trazos se escriben secuencialmente como caligrafía o plotter, con agrupación opcional por palabra. Disparador: se reproduce cuando el elemento entra en la viewport (IntersectionObserver, disparador viewport) o por dispatch explícito. Tecnología: dibujo instanciado por carácter en canvas (widget text-draw en Rust/WASM) con fallback en keyframe CSS (char-draw/word-draw). Propósito: hacer que los títulos parezcan autografiados — escritos frente a ti en vez de estampados.',
    },
    'ring-sheen': {
      alt: 'Borde de tile con brillo viajando por el anillo',
      longdesc:
        'Los contornos de borde en los tiles del mosaico y de proyectos relacionados. Animación: una banda de brillo viaja por el anillo del borde del tile como luz deslizándose en un marco, en loop periódico lento. Disparador: hace loop mientras el tile está visible; se intensifica en hover. Tecnología: pasada de anillo en canvas compuesta sobre el borde del tile. Propósito: mantener vivas las cuadrículas de tarjetas estáticas con un destello ambiente de bajo costo.',
    },
    'corner-brackets': {
      alt: 'Esquinas de botón expandiéndose en corchetes en hover',
      longdesc:
        'Las decoraciones de corchetes de esquina en los botones de acción (barras de cerrar, CTAs). Animación: los cuatro corchetes de esquina se expanden hacia afuera y se aclaran en hover, luego se contraen de vuelta — como un retículo de enfoque de cámara bloqueándose. Disparador: hover/foco en el botón. Tecnología: pequeño widget canvas por botón (dibujo instanciado de corchetes) con fallback en transición CSS. Propósito: comunicar interactividad con una pista de enfoque precisa e instrumental.',
    },
    'scene-3d': {
      alt: 'Escena 3D interactiva de campo estelar y tierra',
      longdesc:
        'Las escenas 3D a pantalla completa — el experimento star-field (cuerpos celestes en órbita con etiquetas de dossier) y el playground de la tierra (planeta girando con controles de órbita). Animación: movimiento continuo inspirado en física — mecánica orbital, rotación, paralaje en el movimiento de cámara y transiciones entre cuerpos. Disparador: corre todo el tiempo que la escena está en pantalla; puntero/toque orbita la cámara. Tecnología: three.js sobre WebGL/WebGPU con el trabajo por frame en la GPU. Propósito: la vitrina 3D en tiempo real insignia del sitio.',
    },
    'genie-modal': {
      alt: 'Medio expandido abriéndose en warp líquido hacia el lightbox',
      longdesc:
        'El lightbox de medios expandidos que abre al hacer clic en una imagen o video de proyecto. Animación: el medio se deforma entre el rectángulo de la figura clicada y la caja del modal a pantalla completa como una lámina líquida — bandas horizontales se atrasan, curvan y estiran por un campo genie mientras partículas de vapor se desprenden del pliegue en movimiento; el mismo campo lo colapsa de vuelta al cerrar. Disparador: clic/toque para abrir, botón de cerrar o Escape para colapsar. Tecnología: widget WebGPU/Rust de mesh-warp + partículas en un worker fuera del hilo principal cuando está habilitado, un renderer 2D-canvas de bandas sin alocación por frame en todo lo demás, y un keyframe CSS de zoom como último recurso. Propósito: reemplazar un scale-fade duro por una transición física estilo dock de macOS.',
    },
    carousel: {
      alt: 'Carrusel de premios deslizando con momentum y barra de progreso',
      longdesc:
        'El carrusel horizontal de premios en el pie de la home. Animación: los ítems se deslizan con momentum y hacen snap en su posición; una barra de progreso se llena a lo largo del riel, un trazo de autoplay anima el temporizador y los controles de acción aparecen. Disparador: gestos de arrastre/scroll, controles anterior/siguiente y el timer de autoplay. Tecnología: scroll snapping nativo más springs en JS y keyframes CSS para el chrome. Propósito: hacer que hojear la tira de premios parezca barajar cartas físicas.',
    },
    'about-text': {
      alt: 'Párrafo del About revelando sus caracteres uno a uno',
      longdesc:
        'Los párrafos de biografía en la sección About. Animación: el texto se revela carácter a carácter en el orden de las frases — cada letra aparece/se mueve en su propio tiempo, así el párrafo parece escribirse solo. Disparador: se reproduce cuando la sección entra en la viewport. Tecnología: JS secuencia spans por carácter con timing dirigido por rAF; el CSS maneja la transición por carácter. Propósito: dar a la bio una cadencia de máquina de escribir/voz acorde a los títulos draw-text.',
    },
    'related-tile': {
      alt: 'Tarjeta de proyecto relacionado elevándose y haciendo zoom en hover',
      longdesc:
        'Las tarjetas de proyectos relacionados al final de las páginas de proyecto. Animación: en hover la tarjeta se eleva, la imagen hace un zoom suave y título/descripción suben — todo con easing de resorte amortiguado (springs sintetizados en CSS linear()) para que el movimiento pase ligeramente y se asiente de forma orgánica; un brillo barre el borde de la tarjeta. Disparador: hover/foco del puntero. Tecnología: transiciones CSS en transform/opacity dirigidas por curvas de resorte. Propósito: hacer que la affordance de navegación se sienta física e invitante.',
    },
    'note-dot': {
      alt: 'Marcador de nota pulsando suavemente',
      longdesc:
        'Los pequeños marcadores de nota/punto usados en las páginas de internals (documentación e internas de proyecto). Animación: el punto pulsa suavemente — un loop respirante de escala y fade. Disparador: hace loop continuamente en pantalla. Tecnología: un keyframe CSS (note-dot-pulse). Propósito: marcar el elemento como anotación viva sin exigir atención.',
    },
    'body-glow': {
      alt: 'Brillo ambiente de la página derivando detrás del contenido',
      longdesc:
        'El brillo de fondo ambiente detrás del contenido de la página. Animación: un gran gradiente radial suave deriva lentamente por el documento, cambiando posición e intensidad en un loop largo. Disparador: corre continuamente en todas las páginas. Tecnología: un keyframe CSS (body-glow-drift) animando una capa de fondo fija — cero JavaScript. Propósito: dar atmósfera y profundidad al tema oscuro en lugar de un fondo plano.',
    },
  },
  de: {
    'progress-bar': {
      alt: 'Routen-Fortschrittsbalken, der während der Navigation über den oberen Rand kriecht',
      longdesc:
        'Der dünne Fortschrittsbalken am oberen Viewport-Rand. Animation: ein scaleX-Transform fegt den Balken über mehrere Sekunden von null auf etwa siebzig Prozent, während ein Routenwechsel läuft, dann springt er auf hundert Prozent und blendet an Ort und Stelle aus, sobald die Ziel-View bereit ist — er zieht sich nie sichtbar zurück. Auslöser: startet bei jeder internen Navigation und endet, wenn die neue View montiert ist. Technik: CSS-Transitionen auf transform und opacity, gesteuert von zwei Zustandsklassen — null JavaScript pro Frame. Zweck: signalisiert einen laufenden Seitenwechsel im nprogress-Stil.',
    },
    'burger-button': {
      alt: 'Hamburger-Menü-Button mit flüssiger Morph-Animation',
      longdesc:
        'Der Hamburger-Menü-Button oben rechts auf jeder Seite. Animation: flüssiger Morph zwischen dem Drei-Striche-Icon und dem Schließen-X — die Striche biegen sich und verschmelzen wie eine Flüssigkeit statt starr zu rotieren. Auslöser: spielt bei Klick/Tippen beim Öffnen des Menüs und umgekehrt beim Schließen; Hover ändert die Strichspannung. Technik: ein von Rust/WASM gesteuertes Canvas-Widget (WebGL-Fragment-Shader) mit WebGPU/OffscreenCanvas-Worker-Variante und reinem CSS-Linien-Fallback. Zweck: kommuniziert den geöffnet/geschlossen-Zustand des Menüs durch eine haptische, physiknahe Transition.',
    },
    'nav-menu-background': {
      alt: 'Animierter Vollbild-Menühintergrund mit fließendem Konturfeld',
      longdesc:
        'Der Vollbild-Hintergrund hinter dem Navigationsmenü-Overlay. Animation: ein langsam wanderndes fraktales Konturfeld — geschichtete fbm-Rauschkämme driften und formen sich kontinuierlich um, wie Hitzeflimmern oder Plasma. Auslöser: startet beim Öffnen des Hamburgermenüs, stoppt und wird beim Schließen entsorgt. Technik: WebGL-Fragment-Shader (fbm in GLSL) auf eigenem Canvas, mit WebGPU/OffscreenCanvas-Worker-Variante und statischem CSS-Gradienten-Fallback. Zweck: verleiht dem Menü eine lebendige, atmosphärische Tiefe statt einer flachen Farbfläche.',
    },
    'nav-menu': {
      alt: 'Navigationsmenü-Einträge mit gestaffeltem Aufstiegs-Eingang',
      longdesc:
        'Das Navigationsmenü-Overlay, das über den Hamburger-Button öffnet. Animation: jeder Menüpunkt steigt gestaffelt ein und fadet dabei (nav-menu-item-in), gleitet einige Pixel nach oben und blendet ein; ein Membran/Plasma-Schimmer driftet in langsamer Schleife über das Panel. Auslöser: der Eingang spielt einmal pro Öffnen von oben nach unten; der Membrandrift läuft, solange das Menü offen ist. Technik: CSS-Keyframes mit Delays pro Eintrag, null JavaScript pro Frame. Zweck: sequenziert die Links, damit das Auge sie der Reihe nach liest statt eines einzigen Aufblitzens.',
    },
    'nav-flag': {
      alt: 'Sprachflaggen-Icon mit Wellen- und Einblend-Animation',
      longdesc:
        'Das kleine Flaggen-Canvas neben der Sprachbeschriftung in der Navigationsleiste. Animation: das Flaggtuch wellt mit sinusförmiger Versetzung, und das Glyphe blendet mit Skalierung ein (nav-flag-in), wenn die Nav montiert oder die Sprache wechselt. Technik: ein Canvas-Widget rendert die Flagge prozedural (geteilte Landesflaggen werden kompositiert); das CSS-Keyframe übernimmt den Eingang. Zweck: markiert die aktive Sprache mit einer Flagge, die wie Stoff wirkt statt wie ein flaches Icon.',
    },
    'switch-slider': {
      alt: 'Einstellungsschalter mit flüssigem Daumen-Gleiten',
      longdesc:
        'Die Ein/Aus-Schalter im Einstellungsdialog (Erscheinungsbild, Bewegung, Effekte). Animation: der Daumen gleitet mit flüssiger Streckung über die Schiene — er längt sich während der Fahrt und schnellt zur Ruhelage zurück, wie ein Tropfen. Auslöser: spielt bei Klick/Tippen oder Tastatur-Umschalten. Technik: WebGL/Canvas-Widget (Rust/WASM-gesteuert), das Schiene und Daumen zeichnet, mit CSS-Fallback für Engines ohne WebGL. Zweck: macht den binären Zustand greifbar und bestätigt das Umschalten.',
    },
    'theme-slider': {
      alt: 'Theme-Umschalter mit orbitalem Tag/Nacht-Gleiten',
      longdesc:
        'Der Hell/Dunkel-Theme-Schalter im Einstellungsdialog und in der Navigation. Animation: der Daumen reist wie ein Himmelskörper — eine Tag/Nacht-Scheibe durchquert die Schiene, während Sonne/Mond-Glyphen darin überblenden. Auslöser: spielt beim Umschalten; auch einmal beim Laden, wenn das gespeicherte Theme vom Standard abweicht. Technik: WebGL/Canvas-Widget (Rust/WASM-gesteuert) mit CSS-Fallback. Zweck: erzählt den Theme-Wechsel als Sonnenaufgang/-untergang statt als binären Flip.',
    },
    'close-button': {
      alt: 'Schließen-Button mit flüssiger Füllung und rotierendem X',
      longdesc:
        'Der runde Schließen-Button an Modals und der erweiterten Medien-Lightbox. Animation: bei Hover steigt eine flüssige Füllung im Kreis auf, während sich die X-Striche drehen und straffen; beim Drücken rastet die Füllung ein. Auslöser: Hover/Fokus armiert, Druck löst aus. Technik: WebGL/Canvas-Widget (Rust/WASM-gesteuert) mit einem schlichten CSS-Button darunter für Engines ohne WebGL. Zweck: verleiht dem Schließen eine physische, befriedigende Druckhaptik.',
    },
    skeleton: {
      alt: 'Lade-Skelett mit morphenden Zellen und Schimmer',
      longdesc:
        'Die Platzhalter-Skelette, die angezeigt werden, solange Inhalte laden (Medienfiguren, Textblöcke, Projektkacheln). Animation: Glyphenzellen morphen zwischen 0/1-Formen, während ein Glanzgradient von links nach rechts über die Fläche wandert (skeleton-shimmer). Auslöser: läuft kontinuierlich, während der Inhalt lädt, und übergibt dann an das echte Element. Technik: Canvas-Widget (Rust/WASM-gesteuertes Zellmorphen) plus das CSS-Shimmer-Keyframe. Zweck: signalisiert „Inhalt kommt“ mit Bewegung, die das Layout vorwegnimmt, statt eines Spinners.',
    },
    'intro-loader': {
      alt: 'Intro-Loader mit gegenläufigen Ringen und Fortschritt',
      longdesc:
        'Der Vollbild-Boot-Loader während des Ladens der ersten Site-Assets. Animation: zwei Ringe drehen gegenläufig (intro-loader-spin-cw/ccw) um einen Prozentzähler und lokalisierte Stufenmeldungen. Auslöser: läuft vom Seitenaufruf bis das Boot-Bundle bereit ist; dann blendet der Loader ab und entfernt sich. Technik: CSS-Keyframes drehen die Ringe; JS meldet nur Fortschritt. Zweck: hält den ersten Paint lebendig und lesbar während der Tier/Polyfill-Bootsequenz.',
    },
    'site-toast': {
      alt: 'Benachrichtigungs-Toast, der aus der Ecke gleitet',
      longdesc:
        'Der kleine Benachrichtigungs-Toast, der in einer Bildschirmecke erscheint — etwa für Kopierbestätigungen und Cookie-Aktionen. Animation: gleitet vom Rand herein und fadet hoch (site-toast-in), hält, dann gleitet er zurück und fadet aus. Auslöser: durch App-Ereignisse ausgelöst (Kopieren, Speicherhinweis, Test-Benachrichtigung). Technik: CSS-Keyframes beim Eintritt und ein --closing-Modifikator beim Austritt. Zweck: lenkt den Blick auf eine kurze Meldung, ohne die Interaktion zu blockieren.',
    },
    'mosaic-burn': {
      alt: 'Portfolio-Kacheltitel, der in Glut verbrennt und sich neu aufbaut',
      longdesc:
        'Der Titeltext auf den Portfolio-Kacheln der Featured-Work-Wand. Animation: bei Hover verbrennen die Buchstaben des Titels — erodierte Kanten, Versengungsspuren und glühende Funkenpartikel verzehren die Glyphen Spalte für Spalte; danach bauen sich die Buchstaben von unten nach oben durch dasselbe Feuerfeld wieder auf, wenn der Zeiger weggeht oder der Hover das Ziel wechselt. Auslöser: Zeiger-Hover auf der Kachel. Technik: Rust/WASM-Partikelsimulation (mosaic-burn-Crate) mit dem Erode/Scorch/Ember-Modell auf Canvas; ein 2D-Canvas-Pfad rendert dasselbe Feld bei deaktivierter GPU-Route — beide teilen eine deterministische Simulation. Zweck: macht aus dem schlichten Hover den markanten Feuereffekt der Site.',
    },
    'mosaic-tile': {
      alt: 'Portfolio-Kachel gleitet per Feder in neuen Slot + Randschimmer',
      longdesc:
        'Die Projektkarten in der Featured-Work-Mosaikwand. Animation: wenn eine Karte bei Hover expandiert, gleiten verschobene Nachbarn auf einer gedämpften Feder in ihre neuen Slots — eine organische Overshoot-Settle-Kurve (in CSS linear() synthetisierte Feder) statt eines linearen Gleitens; ein Schimmer wandert periodisch über den Rand jeder Kachel. Auslöser: das Hover-Repack animiert die verschobenen Kacheln; der Randschimmer läuft sanft im Loop. Technik: JS-Masonry-Pack + CSS-Transition auf transform; der Schimmer ist ein Canvas-Ring-Pass. Zweck: hält die Wand flüssig und lebendig, während sie sich neu ordnet.',
    },
    'media-progressive': {
      alt: 'Medienbild morpht von verschwommener Niedrig- zu scharfer Hochqualität',
      longdesc:
        'Jede Medienfigur der Site (Projektbilder und -videos). Animation: zuerst zeichnet ein niedrigauflösender Platzhalter, dann morpht er zum dekodierten hochauflösenden Asset — die Hochauflösungs-Schicht löst sich aus dem unscharfen/gezoomten Thumb-Zustand statt aufzublitzen, sodass das Auge ein durchgehendes Scharfwerden liest. Auslöser: startet, wenn die Figur in die Viewport scrollt (IntersectionObserver) und das Asset im WASM-Pool dekodiert ist. Technik: WASM-Bilddekodierung außerhalb des Hauptthreads, Blob-URL-Wechsel und CSS/Canvas-Morph. Zweck: lässt progressives Laden wie ein Hereinkommen des Fokus wirken statt eines harten Austauschs.',
    },
    'glitch-portrait': {
      alt: 'About-Porträt mit VHS-Glitch-Korruptionsanimation',
      longdesc:
        'Das Porträtbild im About-Bereich. Animation: periodische VHS-artige Korruption — Scanline-Rollen, Kanaltrennung, Blockverschiebungen und Rauschbänder fegen kurz über das Foto, bevor es sauber zurückspringt. Auslöser: läuft auf zufälligem Timer, solange der Bereich im Bild ist. Technik: WebGL-Fragment-Shader-Pass auf der Porträt-Textur mit Canvas-Fallback. Zweck: gibt dem Porträt eine lebendige Analog-Video-Persönlichkeit passend zur technischen Ästhetik der Site.',
    },
    'divider-sheen': {
      alt: 'Footer-Trennlinie mit wanderndem Lichtschimmer',
      longdesc:
        'Die Haarlinien-Trenner zwischen Seitenbereichen und Footer-Spalten. Animation: ein weiches Lichtband wandert langsam entlang der Linie und fegt in Endlosschleife von Kante zu Kante. Auslöser: läuft kontinuierlich, solange der Trenner im Bild ist. Technik: Canvas-Widget, das die Linie plus das wandernde Gradientenband zeichnet. Zweck: hebt eine statische Linie zu einem subtilen, lebendigen Detail.',
    },
    'text-draw': {
      alt: 'Text zeichnet sich Buchstabe für Buchstabe wie handschriftlich',
      longdesc:
        'Bereichstitel, Links und Bildunterschriften mit dem Draw-Text-Treatment auf der ganzen Site. Animation: jedes Zeichen wird federstrich-artig in Lesereihenfolge gezeichnet — Striche schreiben sich sequenziell wie Handschrift oder Plotter, optional mit Wortgruppierung. Auslöser: spielt, wenn das Element in die Viewport scrollt (IntersectionObserver, Viewport-Trigger) oder per explizitem Dispatch. Technik: instanziertes Pro-Zeichen-Zeichnen auf Canvas (Rust/WASM-text-draw-Widget) mit CSS-Keyframe-Fallback (char-draw/word-draw). Zweck: lässt Überschriften handschriftlich wirken — vor den Augen geschrieben statt gestempelt.',
    },
    'ring-sheen': {
      alt: 'Kachelrand mit um den Ring wanderndem Lichtschimmer',
      longdesc:
        'Die Rahmenkonturen an Mosaik- und Related-Projekt-Kacheln. Animation: ein helles Schimmerband wandert um den Kachelrand wie Licht über einen Bilderrahmen — in langsamer, periodischer Schleife. Auslöser: läuft, solange die Kachel sichtbar ist; intensiviert bei Hover. Technik: Canvas-Ring-Pass über dem Kachelrand. Zweck: hält statische Kartenraster mit einem kostengünstigen Umgebungsglanz lebendig.',
    },
    'corner-brackets': {
      alt: 'Button-Eckklammern expandieren bei Hover',
      longdesc:
        'Die Eckklammer-Dekorationen an Aktionsbuttons (Schließleisten, CTAs). Animation: die vier Eckklammern expandieren bei Hover nach außen und hellen auf, dann ziehen sie sich zurück — wie ein Kamera-Fokus-Retikel, das einrastet. Auslöser: Hover/Fokus auf dem Button. Technik: kleines Canvas-Widget pro Button (instanziertes Klammer-Zeichnen) mit CSS-Transitions-Fallback. Zweck: signalisiert Interaktivität mit einem präzisen, instrumentenhaften Fokus-Cue.',
    },
    'scene-3d': {
      alt: 'Interaktive 3D-Sternenfeld- und Erdszene',
      longdesc:
        'Die Vollbild-3D-Szenen — das Star-Field-Experiment (orbitierende Himmelskörper mit Dossier-Labels) und der Earth-Playground (rotierender Planet mit Orbit-Steuerung). Animation: kontinuierliche, physikalisch inspirierte Bewegung — Orbitalmechanik, Rotation, Kameraparallaxe und Übergänge zwischen Körpern. Auslöser: läuft, solange die Szene im Bild ist; Zeiger/Touch umkreist die Kamera. Technik: three.js auf WebGL/WebGPU mit Frame-Arbeit auf der GPU. Zweck: das Flaggschiff-Echtzeit-3D-Showcase der Site.',
    },
    'genie-modal': {
      alt: 'Erweiterte Medien warpen flüssig in die Lightbox',
      longdesc:
        'Die erweiterte Medien-Lightbox, die beim Klick auf ein Projektbild oder -video öffnet. Animation: das Medium warpt zwischen dem Rechteck der geklickten Figur und der Vollbild-Modal-Box wie ein flüssiges Blatt — horizontale Streifen hinken, biegen und dehnen sich durch ein Genie-Feld, während Dampfpartikel von der wandernden Falte abfallen; dasselbe Feld kollabiert es beim Schließen zurück. Auslöser: Klick/Tippen zum Öffnen, Schließen-Button oder Escape zum Kollabieren. Technik: WebGPU/Rust-Mesh-Warp + Partikel-Widget auf einem Worker abseits des Hauptthreads (wenn aktiviert), ein allokationsfreier 2D-Canvas-Streifen-Renderer überall sonst und ein CSS-Zoom-Keyframe als letzte Stufe. Zweck: ersetzt ein hartes Scale-Fade durch eine physische Transition im macOS-Dock-Stil.',
    },
    carousel: {
      alt: 'Awards-Karussell gleitet mit Momentum und Fortschrittsbalken',
      longdesc:
        'Das horizontale Awards-Karussell im Home-Footer. Animation: Einträge gleiten mit Momentum und rasten ein; ein Fortschrittsbalken füllt sich entlang der Schiene, ein Autoplay-Strich animiert den Timer und Aktionssteuerungen poppen herein. Auslöser: Zieh-/Scroll-Gesten, Zurück/Weiter-Steuerung und der Autoplay-Timer. Technik: natives Scroll-Snapping plus JS-Springs und CSS-Keyframes für das Chrome. Zweck: lässt das Durchblättern der Awards-Leiste wie das Mischen physischer Karten wirken.',
    },
    'about-text': {
      alt: 'About-Absatz enthüllt seine Zeichen eines nach dem anderen',
      longdesc:
        'Die Biografie-Absätze im About-Bereich. Animation: der Text enthüllt sich Zeichen für Zeichen in Satzreihenfolge — jeder Buchstabe fadet/bewegt in eigenem Timing, sodass der Absatz wie selbstgeschrieben wirkt. Auslöser: spielt, wenn der Bereich in die Viewport scrollt. Technik: JS sequenziert Pro-Zeichen-Spans mit rAF-getriebenem Timing; CSS übernimmt die Pro-Zeichen-Transition. Zweck: gibt der Bio eine Schreibmaschinen-/Sprachkadenz passend zu den Draw-Text-Titeln.',
    },
    'related-tile': {
      alt: 'Related-Projektkarte hebt und zoomt bei Hover',
      longdesc:
        'Die Related-Projekt-Karten am Ende der Projektseiten. Animation: bei Hover hebt die Karte, ihr Bild zoomt sanft und Titel/Beschreibung gleiten hoch — alles auf gedämpftem Feder-Easing (in CSS linear() synthetisierte Federn), sodass die Bewegung leicht überschwingt und organisch einpendelt; ein Schimmer fegt über den Kartenrand. Auslöser: Zeiger-Hover/Fokus. Technik: CSS-Transitions auf transform/opacity mit Feder-Easing-Kurven. Zweck: macht die Navigations-Affordance physisch und einladend.',
    },
    'note-dot': {
      alt: 'Notizmarker pulsiert sanft',
      longdesc:
        'Die kleinen Notiz-/Punktmarker auf Internals-Seiten (Dokumentation und Projektinterna). Animation: der Punkt pulsiert sanft — ein atmender Skalierungs- und Fade-Loop. Auslöser: läuft kontinuierlich im Bild. Technik: ein CSS-Keyframe (note-dot-pulse). Zweck: markiert das Element als lebendige Anmerkung, ohne Aufmerksamkeit zu fordern.',
    },
    'body-glow': {
      alt: 'Umgebendes Seitenglühen driftet langsam hinter dem Inhalt',
      longdesc:
        'Das Umgebungs-Hintergrundglühen hinter dem Seiteninhalt. Animation: ein großer weicher Radialgradient driftet langsam über das Dokument und verschiebt Position und Intensität in langer Schleife. Auslöser: läuft kontinuierlich auf jeder Seite. Technik: ein CSS-Keyframe (body-glow-drift) animiert eine fixe Hintergrundschicht — null JavaScript. Zweck: gibt dem dunklen Theme Atmosphäre und Tiefe statt eines flachen Hintergrunds.',
    },
  },
  hrk: {
    'progress-bar': {
      alt: 'Routen-Fortschrittsbalken de beim Navigieren iwer de owerste Rand lauft',
      longdesc:
        'De dünne Fortschrittsbalken fix am owerste Rand vum Viewport. Animation: e scaleX-Transform zieht de Balken in mehrere Sekunde vun null uff etwa siebzig Prozent, solang e Routenwechsel lauft, dann springt er uff hunnert Prozent un verblasst an Ort, wenn die Ziel-View fertig iss — er zieht sich nie sichtbar zerick. Auslöser: startet bei jeder interne Navigation un endet, wenn die neue View montiert iss. Technik: CSS-Transitione uff transform un opacity, gesteuert vun zwei Zustandsklasse — null JavaScript pro Frame. Zweck: zeigt an, dass e Seitenwechsel lauft, im nprogress-Stil.',
    },
    'burger-button': {
      alt: 'Hamburger-Menü-Knopf mit fliessicher Morph-Animatsioon',
      longdesc:
        'Der Hamburger-Menü-Knopf uewe rechts uf jedere Seit. Animatsioon: fliessicher Morph twische em Drei-Strich-Icon un em Schlies-X — die Strich biege sich un verschmelze wie Flissichkeit statt starr zu rotiere. Usslöser: spielt bei Klick/Dippe beim Menü-Uffmache un umkehrt beim Zumache; Hover ännert die Strichspannung. Technik: en Rust/WASM-gestüürtes Canvas-Widget (WebGL-Fragment-Shader) mit WebGPU/OffscreenCanvas-Worker-Variante un reinem CSS-Linie-Fallback. Zweck: zaigt em Menü sei uff/zu-Zustand durch e haptische, physiknahe Übergang.',
    },
    'nav-menu-background': {
      alt: 'Animiarter Vollbild-Menühintergrund mit fliessendem Konturfeld',
      longdesc:
        'Der Vollbild-Hintergrund hinner em Navigationsmenü-Overlay. Animatsioon: en langsom wanderndes fraktales Konturfeld — gschichtete fbm-Rauschkämm drifte un forme sich ständig um, wie Hitzeflimmere oder Plasma. Usslöser: startet beim Hamburgermenü-Uffmache, stoppt un wird beim Zumache entsorgt. Technik: WebGL-Fragment-Shader (fbm in GLSL) uf eigenem Canvas, mit WebGPU/OffscreenCanvas-Worker-Variante un statischem CSS-Gradient-Fallback. Zweck: git em Menü e lewendige, atmosphärische Tief statt e flache Farbfläch.',
    },
    'nav-menu': {
      alt: 'Navigationsmenü-Einträg mit gstaffeltem Uffstiegs-Eingang',
      longdesc:
        'Des Navigationsmenü-Overlay, des über em Hamburger-Knopf uffgeht. Animatsioon: jeder Menüpunkt steigt gstaffelt ein un fadet derbei (nav-menu-item-in), gleitet e paa Pixel nae uewe un blendet ein; e Membran/Plasma-Schimmer driftet in langsomer Schleif über des Panel. Usslöser: der Eingang spielt einmol pro Uffmache von uewe nae unne; der Membrandrift lääft, solang des Menü uff is. Technik: CSS-Keyframes mit Delays pro Eintrag, null JavaScript pro Frame. Zweck: sequenziart die Links, damit des Aug se der Reih nae liest statt von em einzige Uffblitze.',
    },
    'nav-flag': {
      alt: 'Schprachflagg-Icon mit Welle- un Einblend-Animatsioon',
      longdesc:
        'Des kleine Flagg-Canvas näwe der Schprachbeschrifftung in der Navigationsleist. Animatsioon: des Flaggtuch wellt mit sinusförmiger Versetzung, un die Glyphen blendet mit Skalierung ein (nav-flag-in), wenn die Nav montiert oder die Schprach wechselt. Technik: en Canvas-Widget rendert die Flagg prozedural (gteilte Lännerflagge werre kompositiert); des CSS-Keyframe übernimmt der Eingang. Zweck: markiert die aktive Schprach mit ere Flagg, die wie Stoff wirkt statt wie e flaches Icon.',
    },
    'switch-slider': {
      alt: 'Einstellungsschalter mit fliessichem Daume-Gleite',
      longdesc:
        'Die Ein/Uss-Schalter im Einstellungsdialog (Erscheinungsbild, Bewegung, Effekte). Animatsioon: der Daume gleitet mit fliessicher Streckung über die Schien — er längt sich während der Fahrt un schnellt zur Ruhlach zurück, wie e Druppe. Usslöser: spielt bei Klick/Dippe oder Tastatur-Umschalte. Technik: WebGL/Canvas-Widget (Rust/WASM-gestüürt), des Schien un Daume zeichnet, mit CSS-Fallback für Engines ohne WebGL. Zweck: macht der binäre Zustand greifbar un bestätigt des Umschalte.',
    },
    'theme-slider': {
      alt: 'Theme-Umschalter mit orbitalem Dag/Nacht-Gleite',
      longdesc:
        'Der Hell/Dunkel-Theme-Schalter im Einstellungsdialog un in der Navigation. Animatsioon: der Daume reist wie e Himmelskörper — e Dag/Nacht-Scheib durchquert die Schien, während Sunn/Mond-Glyphe drin überblende. Usslöser: spielt beim Umschalte; au einmol beim Lade, wenn des gespeicherte Theme vom Standard abweicht. Technik: WebGL/Canvas-Widget (Rust/WASM-gestüürt) mit CSS-Fallback. Zweck: erzählt der Theme-Wechsel als Sunneuffgang/-unnergang statt als binären Flip.',
    },
    'close-button': {
      alt: 'Schlies-Knopf mit fliessicher Füllung un rotierendem X',
      longdesc:
        'Der runde Schlies-Knopf an Modals un der erweiterte Medie-Lightbox. Animatsioon: bei Hover steigt e fliessige Füllung im Kreis uff, während sich die X-Strich drehe un straffe; beim Drücke rastet die Füllung ein. Usslöser: Hover/Fokus armiert, Druck löst uss. Technik: WebGL/Canvas-Widget (Rust/WASM-gestüürt) mit nem schlichte CSS-Knopf drunner für Engines ohne WebGL. Zweck: git em Schliesse e physische, befriedigende Druckhaptik.',
    },
    skeleton: {
      alt: 'Lade-Skelett mit morphende Zelle un Schimmer',
      longdesc:
        'Die Platzhalter-Skelette, die aazeigt werre, solang Inhalte lade (Mediefigure, Textblöck, Projektkachle). Animatsioon: Glyphenzelle morphe twische 0/1-Forme, während e Glanzgradient von links nae rechts über die Fläch wandert (skeleton-shimmer). Usslöser: lääft kontinuierlich, während der Inhalt lädt, un übergit dann ans echte Element. Technik: Canvas-Widget (Rust/WASM-gestüürtes Zellmorphe) plus des CSS-Shimmer-Keyframe. Zweck: signalisiert „Inhalt kümmt“ mit Bewegung, die des Layout vorwegnimmt, statt von em Spinner.',
    },
    'intro-loader': {
      alt: 'Intro-Loader mit gegenläufige Ring un Fortschritt',
      longdesc:
        'Der Vollbild-Boot-Loader während des Lades von de erschte Site-Assets. Animatsioon: zwei Ring drehe gegenläufig (intro-loader-spin-cw/ccw) um en Prozentzähler un lokalisiarte Stufemeldunge. Usslöser: lääft vom Seiteuffruf bis des Boot-Bundle bereit is; dann blendet der Loader ab un entfernt sich. Technik: CSS-Keyframes drehe die Ring; JS meldet nur Fortschritt. Zweck: hält der erschte Paint lewendig un lesbar während der Tier/Polyfill-Bootsequenz.',
    },
    'site-toast': {
      alt: 'Benachrichtigungs-Toast, der uss der Eck gleitet',
      longdesc:
        'Der kleine Benachrichtigungs-Toast, der in ere Bildschirmeck erscheint — etwa für Kopierbestätigunge un Cookie-Aktioone. Animatsioon: gleitet vom Rand herein un fadet hoch (site-toast-in), hält, dann gleitet er zurück un fadet uss. Usslöser: durch App-Ereignisse ussglöst (Kopiere, Speicherhinweis, Test-Benachrichtigung). Technik: CSS-Keyframes beim Eintritt un en --closing-Modifikator beim Ustritt. Zweck: lenkt der Blick uf e kurze Meldung, ohne die Interaktion zu blockiere.',
    },
    'mosaic-burn': {
      alt: 'Portfolio-Kacheltitel, der in Glut verbrennt un sich neu uffbaut',
      longdesc:
        'Der Titeltext uf de Portfolio-Kachle von der Featured-Work-Wand. Animatsioon: bei Hover verbrenne die Buchstawe vom Titel — erodierte Kanten, Versengungsspure un glühende Funkepartikel verzehre die Glyphe Spalt für Spalt; danach baue sich die Buchstawe von unne nae uewe durch desselbe Feierfeld widder uff, wenn der Zeiger weckgeht oder der Hover des Ziel wechselt. Usslöser: Zeiger-Hover uf der Kachel. Technik: Rust/WASM-Partikelsimulatsioon (mosaic-burn-Crate) mit em Erode/Scorch/Ember-Modell uf Canvas; en 2D-Canvas-Pfad rendert desselbe Feld bei deaktivierter GPU-Rout — beede teile e deterministische Simulatsioon. Zweck: macht uss em schlichte Hover der markante Feiereffekt von der Site.',
    },
    'mosaic-tile': {
      alt: 'Portfolio-Kachel gleitet per Feier in neuen Slot + Randschimmer',
      longdesc:
        'Die Projektkarte in der Featured-Work-Mosaikwand. Animatsioon: wenn e Kart bei Hover expandiert, gleite verschowene Naebers uf ener gedämpfte Feier in ihre neue Slots — e organische Overshoot-Settle-Kurv (in CSS linear() synthetisiarte Feier) statt von em lineare Gleite; e Schimmer wandert periodisch über der Rand von jedere Kachel. Usslöser: des Hover-Repack animiert die verschowene Kachle; der Randschimmer lääft sanft im Loop. Technik: JS-Masonry-Pack + CSS-Transition uf transform; der Schimmer is en Canvas-Ring-Pass. Zweck: hält die Wand flissig un lewendig, während se sich neu ornnet.',
    },
    'media-progressive': {
      alt: 'Mediebild morpht von verschwommener Niedrig- zu scharfer Hochqualität',
      longdesc:
        'Jede Mediefigur von der Site (Projektbilder un -videos). Animatsioon: zuerst zeichnet e niedrigufflösender Platzhalter, dann morpht er zum dekodierte hochufflösende Asset — die Hochufflösungs-Schicht löst sich uss em unscharfe/gezoomte Thumb-Zustand statt uffzublitze, sodass des Aug e durchgehendes Scharfwerre liest. Usslöser: startet, wenn die Figur in die Viewport scrollt (IntersectionObserver) un des Asset im WASM-Pool dekodiert is. Technik: WASM-Bilddekodierung usserhalb vom Hauptthread, Blob-URL-Wechsel un CSS/Canvas-Morph. Zweck: lässt progressives Lade wie e Hereinkomme vom Fokus wirke statt von em harte Ustausch.',
    },
    'glitch-portrait': {
      alt: 'About-Porträt mit VHS-Glitch-Korruptsiounsanimatsioon',
      longdesc:
        'Des Porträtbild im About-Bereich. Animatsioon: periodische VHS-artige Korruptsioon — Scanline-Rolle, Kanaltrennung, Blockverschiebunge un Rauschbänner fege kurz über des Foto, bevor es sauber zurückspringt. Usslöser: lääft uf zufälligem Timer, solang der Bereich im Bild is. Technik: WebGL-Fragment-Shader-Pass uf der Porträt-Textur mit Canvas-Fallback. Zweck: git em Porträt e lewendige Analog-Video-Persönlichkeit passend zur technische Ästhetik von der Site.',
    },
    'divider-sheen': {
      alt: 'Footer-Trennlinie mit wanderndem Lichtschimmer',
      longdesc:
        'Die Haarlinie-Trenner twische Seitebereiche un Footer-Spalte. Animatsioon: e weiches Lichtband wandert langsom entlang der Linie un fegt in Endlosschleif von Kant zu Kant. Usslöser: lääft kontinuierlich, solang der Trenner im Bild is. Technik: Canvas-Widget, des die Linie plus des wandernde Gradientenband zeichnet. Zweck: hebt e statische Linie zu nem subtile, lewendige Detail.',
    },
    'text-draw': {
      alt: 'Text zeichnet sich Buchstawe für Buchstawe wie handschriftlich',
      longdesc:
        'Bereichstitel, Links un Bildunnerschriffte mit em Draw-Text-Treatment uf der ganze Site. Animatsioon: jedes Zeiche wird feierstrich-artig in Lesereihefolg gezeichnet — Strich schreibe sich sequenziell wie Handschrift oder Plotter, optional mit Wortgruppierung. Usslöser: spielt, wenn des Element in die Viewport scrollt (IntersectionObserver, Viewport-Trigger) oder per explizitem Dispatch. Technik: instanziertes Pro-Zeiche-Zeichne uf Canvas (Rust/WASM-text-draw-Widget) mit CSS-Keyframe-Fallback (char-draw/word-draw). Zweck: lässt Überschriffte handschriftlich wirke — vor de Auge geschriewe statt gstempelt.',
    },
    'ring-sheen': {
      alt: 'Kachelrand mit um der Ring wanderndem Lichtschimmer',
      longdesc:
        'Die Rahmenkonture an Mosaik- un Related-Projekt-Kachle. Animatsioon: e helles Schimmerband wandert um der Kachelrand wie Licht über e Bilderrahme — in langsomer, periodischer Schleif. Usslöser: lääft, solang die Kachel sichtbar is; intensiviert bei Hover. Technik: Canvas-Ring-Pass über em Kachelrand. Zweck: hält statische Karteraster mit nem kostengünstige Umgebungsglanz lewendig.',
    },
    'corner-brackets': {
      alt: 'Knopf-Eckklammere expandiere bei Hover',
      longdesc:
        'Die Eckklammer-Dekoratsioone an Aktioonsknöpf (Schliesleiste, CTAs). Animatsioon: die vier Eckklammere expandiere bei Hover nae uße un helle uff, dann ziehe se sich zurück — wie e Kamera-Fokus-Retikel, des einrastet. Usslöser: Hover/Fokus uf em Knopf. Technik: kleines Canvas-Widget pro Knopf (instanziertes Klammer-Zeichne) mit CSS-Transitions-Fallback. Zweck: signalisiert Interaktivität mit nem präzise, instrumentehafte Fokus-Cue.',
    },
    'scene-3d': {
      alt: 'Interaktive 3D-Sternefeld- un Erdszene',
      longdesc:
        'Die Vollbild-3D-Szene — des Star-Field-Experiment (orbitierende Himmelskörper mit Dossier-Labels) un der Earth-Playground (rotierender Planet mit Orbit-Steierung). Animatsioon: kontinuierliche, physikalisch inspiriarte Bewegung — Orbitalmechanik, Rotatsioon, Kameraparallax un Übergäng twische Körper. Usslöser: lääft, solang die Szene im Bild is; Zeiger/Touch umkreist die Kamera. Technik: three.js uf WebGL/WebGPU mit Frame-Arbeit uf der GPU. Zweck: des Flaggschiff-Echtzeit-3D-Showcase von der Site.',
    },
    'genie-modal': {
      alt: 'Erweiterte Medie warpe flissig in die Lightbox',
      longdesc:
        'Die erweiterte Medie-Lightbox, die beim Klick uf e Projektbild oder -video uffgeht. Animatsioon: des Medium warpt twische em Rechteck von der geklickte Figur un der Vollbild-Modal-Box wie e flissiges Blatt — horizontale Streife hinnere, biege un dehne sich durch e Genie-Feld, während Dampfpartikel von der wandernde Falte abfalle; desselbe Feld kollabiert es beim Schliesse zurück. Usslöser: Klick/Dippe zum Uffmache, Schlies-Knopf oder Escape zum Kollabiere. Technik: WebGPU/Rust-Mesh-Warp + Partikel-Widget uf nem Worker abseits vom Hauptthread (wenn aktiviert), en allokationsfreier 2D-Canvas-Streife-Renderer überall sunst un e CSS-Zoom-Keyframe als letzte Stuf. Zweck: ersetzt e hartes Scale-Fade durch e physische Übergang im macOS-Dock-Stil.',
    },
    carousel: {
      alt: 'Awards-Karussell gleitet mit Momentum un Fortschrittsbalken',
      longdesc:
        'Des horizontale Awards-Karussell im Home-Footer. Animatsioon: Einträg gleite mit Momentum un raste ein; e Fortschrittsbalken füllt sich entlang der Schien, e Autoplay-Strich animiert der Timer un Aktioonssteierunge poppe herein. Usslöser: Zieh-/Scroll-Geste, Zurück/Weiter-Steierung un der Autoplay-Timer. Technik: natives Scroll-Snapping plus JS-Feier un CSS-Keyframes für des Chrome. Zweck: lässt des Durchblättere von der Awards-Leist wie des Mische physischer Karte wirke.',
    },
    'about-text': {
      alt: 'About-Absatz enthüllt seine Zeiche eins nae em annere',
      longdesc:
        'Die Biografie-Absätz im About-Bereich. Animatsioon: der Text enthüllt sich Zeiche für Zeiche in Satzreihefolg — jeder Buchstaw fadet/bewegt in eigenem Timing, sodass der Absatz wie selbstgeschriewe wirkt. Usslöser: spielt, wenn der Bereich in die Viewport scrollt. Technik: JS sequenziert Pro-Zeiche-Spans mit rAF-getriebenem Timing; CSS übernimmt die Pro-Zeiche-Transition. Zweck: git der Bio e Schreibmaschin-/Sprachkadenz passend zu de Draw-Text-Titel.',
    },
    'related-tile': {
      alt: 'Related-Projektkart hebt un zoomt bei Hover',
      longdesc:
        'Die Related-Projekt-Karte am End von de Projektseite. Animatsioon: bei Hover hebt die Kart, ihr Bild zoomt sanft un Titel/Beschreibung gleite hoch — alles uf gedämpftem Feier-Easing (in CSS linear() synthetisiarte Feier), sodass die Bewegung leicht überschwingt un organisch einpendelt; e Schimmer fegt über der Karterand. Usslöser: Zeiger-Hover/Fokus. Technik: CSS-Transitions uf transform/opacity mit Feier-Easing-Kurve. Zweck: macht die Navigations-Affordance physisch un einladend.',
    },
    'note-dot': {
      alt: 'Notizmarker pulsiert sanft',
      longdesc:
        'Die kleine Notiz-/Punktmarker uf Internals-Seite (Dokumentatsioon un Projektinterna). Animatsioon: der Punkt pulsiert sanft — e atmender Skalierungs- un Fade-Loop. Usslöser: lääft kontinuierlich im Bild. Technik: e CSS-Keyframe (note-dot-pulse). Zweck: markiert des Element als lewendige Anmerkung, ohne Uffmerksamkeit zu fordere.',
    },
    'body-glow': {
      alt: 'Umgebendes Seiteglühe driftet langsom hinner em Inhalt',
      longdesc:
        'Des Umgebungs-Hintergrundglühe hinner em Seiteinhalt. Animatsioon: e grosser weicher Radialgradient driftet langsom über des Dokument un verschiebt Positsioon un Intensität in langer Schleif. Usslöser: lääft kontinuierlich uf jedere Seit. Technik: e CSS-Keyframe (body-glow-drift) animiert e fixe Hintergrundschicht — null JavaScript. Zweck: git em dunkle Theme Atmosphäre un Tief statt von em flache Hintergrund.',
    },
  },
  cas: {
    'progress-bar': {
      alt: 'Barra de progreso de ruta recorriendo el borde superior durante la navegación',
      longdesc:
        'La barra fina de progreso fija en el borde superior del viewport. Animación: un transform scaleX recorre la barra de cero hasta unos setenta por ciento en varios segundos mientras el cambio de ruta está en marcha, después completa hasta cien por ciento y se desvanece en el lugar cuando la vista destino resuelve — nunca retrocede visiblemente. Disparador: arranca en cada navegación interna y termina cuando la nueva vista se monta. Tecnología: transiciones CSS en transform y opacity manejadas por dos clases de estado — cero JavaScript por frame. Propósito: comunicar que una transición de página está en curso, estilo nprogress.',
    },
    'burger-button': {
      alt: 'Botón de menú hamburguesa con animación de morph líquido',
      longdesc:
        'El botón de menú hamburguesa en la esquina superior derecha de cada página. Animación: morph líquido entre el glifo de tres líneas y la equis de cierre — los trazos se curvan y se fusionan como fluido en vez de rotar rígidamente. Disparador: se reproduce al hacer clic/toque cuando el menú abre y se revierte cuando cierra; el hover cambia la tensión de los trazos. Tecnología: widget canvas dirigido por Rust/WASM (shader de fragmento WebGL), con variante en worker WebGPU/OffscreenCanvas y fallback CSS puro. Propósito: comunicar el estado abierto/cerrado del menú con una transición táctil y física.',
    },
    'nav-menu-background': {
      alt: 'Fondo animado a pantalla completa del menú con campo de contornos fluido',
      longdesc:
        'El fondo a pantalla completa pintado atrás del overlay del menú de navegación. Animación: un campo de contornos fractales en movimiento lento — capas de ruido fbm derivan y se remodelan continuamente, como espejismo de calor o plasma. Disparador: arranca cuando el menú hamburguesa abre, se frena y se descarta cuando cierra. Tecnología: shader de fragmento WebGL (fbm en GLSL) en un canvas dedicado, con variante WebGPU/OffscreenCanvas en worker y fallback de gradiente CSS estático. Propósito: darle al menú una profundidad atmosférica viva en lugar de un panel de color plano.',
    },
    'nav-menu': {
      alt: 'Ítems del menú de navegación con entrada ascendente escalonada',
      longdesc:
        'El overlay del menú de navegación que abre desde el botón hamburguesa. Animación: cada ítem entra con subida y fade escalonados (nav-menu-item-in), deslizándose unos píxeles para arriba mientras aparece; un destello de membrana/plasma deriva por el panel en un loop lento. Disparador: la entrada se reproduce una vez por apertura, secuenciada de arriba abajo; la deriva de la membrana hace loop mientras el menú está abierto. Tecnología: keyframes CSS con delays por ítem, cero JavaScript por frame. Propósito: secuenciar los enlaces para que el ojo los lea en orden en vez de un flash único.',
    },
    'nav-flag': {
      alt: 'Icono de bandera del idioma con animación de onda y entrada',
      longdesc:
        'El pequeño canvas de bandera al lado de la etiqueta de idioma en la barra de navegación. Animación: la tela de la bandera ondula con un ripple senoidal y el glifo completo entra con escala (nav-flag-in) cuando la nav monta o cambia el idioma. Tecnología: widget canvas que renderiza la bandera proceduralmente (las banderas de países divididos se componen), con el keyframe CSS encargándose de la entrada. Propósito: marcar el idioma activo con una bandera que parece tela, no un icono plano.',
    },
    'switch-slider': {
      alt: 'Interruptor de preferencia con deslizamiento líquido del pulgar',
      longdesc:
        'Los interruptores de prendido/apagado adentro del diálogo de preferencias (apariencia, movimiento, efectos). Animación: el pulgar se desliza por el riel con estiramiento líquido — se alarga durante el trayecto y vuelve al reposo, como una gota. Disparador: se reproduce al hacer clic/toque o alternar por teclado. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) pintando riel y pulgar, con fallback CSS para motores sin WebGL. Propósito: darle tacto al estado binario y confirmar que la alternancia pasó.',
    },
    'theme-slider': {
      alt: 'Alternador de tema con deslizamiento orbital día/noche',
      longdesc:
        'El interruptor de tema claro/oscuro en el diálogo de preferencias y la navegación. Animación: el pulgar viaja como un cuerpo orbital — un disco día/noche atraviesa el riel mientras glifos de sol/luna hacen crossfade adentro de él. Disparador: se reproduce al alternar; también una vez al cargar cuando el tema guardado difiere del predeterminado. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) con fallback CSS. Propósito: narrar el cambio de tema como un amanecer/atardecer en vez de un flip binario.',
    },
    'close-button': {
      alt: 'Botón de cerrar con relleno líquido y equis giratoria',
      longdesc:
        'El botón circular de cerrar de los modales y del lightbox de medios expandido. Animación: en hover un relleno líquido sube adentro del círculo mientras los trazos de la equis rotan y se tensan; al apretar, el relleno se traba. Disparador: hover/foco lo arma, apretar lo libera. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) con un botón CSS simple abajo para motores sin WebGL. Propósito: darle al cierre una sensación física y satisfactoria de apriete.',
    },
    skeleton: {
      alt: 'Esqueleto de carga con celdas en morph y brillo',
      longdesc:
        'Los esqueletos de placeholder mostrados donde el contenido todavía carga (figuras de medios, bloques de texto, tiles de proyecto). Animación: celdas de glifo hacen morph entre formas 0/1 mientras un brillo en gradiente atraviesa la superficie de izquierda a derecha (skeleton-shimmer). Disparador: corre continuamente mientras el contenido carga, después entrega al elemento real. Tecnología: widget canvas (morph de celdas dirigido por Rust/WASM) más el keyframe CSS del shimmer. Propósito: señalar "el contenido llega" con movimiento que anticipa el layout en vez de un spinner.',
    },
    'intro-loader': {
      alt: 'Loader de introducción con anillos contrarrotativos y progreso',
      longdesc:
        'El loader de arranque a pantalla completa mostrado mientras cargan los primeros assets del sitio. Animación: dos anillos giran en direcciones opuestas (intro-loader-spin-cw/ccw) alrededor de un contador de porcentaje y mensajes de etapa localizados. Disparador: corre desde la carga de la página hasta que el bundle de arranque está listo, cuando el loader completo se desvanece y se retira. Tecnología: keyframes CSS girando los anillos; el JS solo reporta progreso. Propósito: mantener el primer paint vivo y legible durante la secuencia de arranque de tiers/polyfills.',
    },
    'site-toast': {
      alt: 'Toast de notificación deslizándose desde la esquina',
      longdesc:
        'El pequeño toast de notificación que aparece en una esquina de la pantalla para eventos como confirmaciones de copia y acciones de cookies. Animación: se desliza desde el borde mientras sube con fade (site-toast-in), se sostiene y sale deslizándose de vuelta con fade. Disparador: disparado por eventos de la app (copia, aviso de almacenamiento, notificación de prueba). Tecnología: keyframes CSS en la entrada y un modificador --closing en la salida. Propósito: atraer la vista a un mensaje transitorio sin bloquear la interacción.',
    },
    'mosaic-burn': {
      alt: 'Título del tile de portafolio quemándose en brasas y rearmándose',
      longdesc:
        'El texto del título en los tiles del mosaico de trabajos destacados. Animación: en hover las letras del título entran en combustión — bordes erosionados, estelas de quemado y partículas de brasa incandescente consumen los glifos columna por columna, y las letras se reconstruyen de abajo para arriba por el mismo campo de fuego cuando el puntero sale o el hover cambia de objetivo. Disparador: hover del puntero en el tile. Tecnología: simulación de partículas en Rust/WASM (crate mosaic-burn) corriendo el modelo erode/scorch/ember en un canvas; un camino 2D-canvas renderiza el mismo campo cuando la ruta GPU está apagada — los dos comparten una simulación determinística. Propósito: convertir el hover simple en el efecto de fuego insignia del sitio.',
    },
    'mosaic-tile': {
      alt: 'Tile de portafolio deslizándose a nuevo slot con resorte + brillo en el borde',
      longdesc:
        'Las tarjetas de proyecto en el mosaico de trabajos destacados. Animación: cuando una tarjeta se expande en hover, los vecinos desplazados se deslizan a sus nuevos slots con un resorte amortiguado — una curva orgánica de overshoot y asentamiento (resorte sintetizado en CSS linear()) en vez de un deslizamiento lineal; un brillo recorre periódicamente el borde de cada tile. Disparador: el repack por hover anima los tiles desplazados; el brillo del borde hace loop suave. Tecnología: pack masonry en JS + transición CSS en transform; el brillo es una pasada de anillo en canvas. Propósito: mantener la pared líquida y viva mientras se reordena.',
    },
    'media-progressive': {
      alt: 'Imagen de medios pasando de borrosa en baja calidad a nítida en alta',
      longdesc:
        'Cada figura de medios del sitio (imágenes y videos de los proyectos). Animación: un placeholder de baja resolución pinta primero, después hace morph al asset de alta resolución decodificado — la capa de alta se resuelve desde el estado borroso/ampliado del thumb en vez de parpadear, así el ojo lee una nitidez continua. Disparador: arranca cuando la figura entra en la viewport (IntersectionObserver) y el asset termina su decode en el pool WASM. Tecnología: decode de imagen WASM fuera del hilo principal, cambio a blob-URL y morph en CSS/canvas. Propósito: hacer que la carga progresiva parezca la imagen entrando en foco, no un reemplazo duro.',
    },
    'glitch-portrait': {
      alt: 'Retrato del About con animación de corrupción glitch VHS',
      longdesc:
        'La imagen del retrato en la sección About. Animación: corrupción periódica estilo VHS — rollos de scanline, separación de canales, desplazamiento de bloques y bandas de ruido barren la foto brevemente antes de que vuelva limpia. Disparador: corre en un timer aleatorio mientras la sección está en pantalla. Tecnología: pasada de shader de fragmento WebGL en la textura del retrato con fallback canvas. Propósito: darle al retrato una personalidad viva de video analógico, acorde a la estética técnica del sitio.',
    },
    'divider-sheen': {
      alt: 'Divisor del pie con un brillo de luz viajero',
      longdesc:
        'Los divisores hairline que separan secciones de página y columnas del pie. Animación: una banda suave de luz viaja lentamente por el hilo, barriendo de punta a punta en loop continuo. Disparador: corre continuamente mientras el divisor está en pantalla. Tecnología: widget canvas pintando la línea más la banda de gradiente en movimiento. Propósito: elevar una regla estática a un detalle sutil y vivo.',
    },
    'text-draw': {
      alt: 'Texto dibujándose letra por letra como manuscrito',
      longdesc:
        'Títulos de sección, enlaces y leyendas con el tratamiento draw-text en todo el sitio. Animación: cada carácter se dibuja estilo trazo de pluma en orden de lectura — los trazos se escriben secuencialmente como caligrafía o plotter, con agrupación opcional por palabra. Disparador: se reproduce cuando el elemento entra en la viewport (IntersectionObserver, disparador viewport) o por dispatch explícito. Tecnología: dibujo instanciado por carácter en canvas (widget text-draw en Rust/WASM) con fallback en keyframe CSS (char-draw/word-draw). Propósito: hacer que los títulos parezcan autografiados — escritos frente tuyo en vez de estampados.',
    },
    'ring-sheen': {
      alt: 'Borde de tile con brillo viajando por el anillo',
      longdesc:
        'Los contornos de borde en los tiles del mosaico y de proyectos relacionados. Animación: una banda de brillo viaja por el anillo del borde del tile como luz deslizándose en un marco, en loop periódico lento. Disparador: hace loop mientras el tile está visible; se intensifica en hover. Tecnología: pasada de anillo en canvas compuesta sobre el borde del tile. Propósito: mantener vivas las cuadrículas de tarjetas estáticas con un destello ambiente de bajo costo.',
    },
    'corner-brackets': {
      alt: 'Esquinas de botón expandiéndose en corchetes en hover',
      longdesc:
        'Las decoraciones de corchetes de esquina en los botones de acción (barras de cerrar, CTAs). Animación: los cuatro corchetes de esquina se expanden para afuera y se aclaran en hover, después se contraen de vuelta — como un retículo de enfoque de cámara trabándose. Disparador: hover/foco en el botón. Tecnología: pequeño widget canvas por botón (dibujo instanciado de corchetes) con fallback en transición CSS. Propósito: comunicar interactividad con una pista de enfoque precisa e instrumental.',
    },
    'scene-3d': {
      alt: 'Escena 3D interactiva de campo estelar y tierra',
      longdesc:
        'Las escenas 3D a pantalla completa — el experimento star-field (cuerpos celestes en órbita con etiquetas de dossier) y el playground de la tierra (planeta girando con controles de órbita). Animación: movimiento continuo inspirado en física — mecánica orbital, rotación, paralaje en el movimiento de cámara y transiciones entre cuerpos. Disparador: corre todo el tiempo que la escena está en pantalla; puntero/toque orbita la cámara. Tecnología: three.js sobre WebGL/WebGPU con el trabajo por frame en la GPU. Propósito: la vidriera 3D en tiempo real insignia del sitio.',
    },
    'genie-modal': {
      alt: 'Medio expandido abriéndose en warp líquido hacia el lightbox',
      longdesc:
        'El lightbox de medios expandidos que abre al hacer clic en una imagen o video de proyecto. Animación: el medio se deforma entre el rectángulo de la figura clicada y la caja del modal a pantalla completa como una lámina líquida — bandas horizontales se atrasan, curvan y estiran por un campo genie mientras partículas de vapor se desprenden del pliegue en movimiento; el mismo campo lo colapsa de vuelta al cerrar. Disparador: clic/toque para abrir, botón de cerrar o Escape para colapsar. Tecnología: widget WebGPU/Rust de mesh-warp + partículas en un worker fuera del hilo principal cuando está habilitado, un renderer 2D-canvas de bandas sin alocación por frame en todo lo demás, y un keyframe CSS de zoom como último recurso. Propósito: reemplazar un scale-fade duro por una transición física estilo dock de macOS.',
    },
    carousel: {
      alt: 'Carrusel de premios deslizando con momentum y barra de progreso',
      longdesc:
        'El carrusel horizontal de premios en el pie de la home. Animación: los ítems se deslizan con momentum y hacen snap en su posición; una barra de progreso se llena a lo largo del riel, un trazo de autoplay anima el temporizador y los controles de acción aparecen. Disparador: gestos de arrastre/scroll, controles anterior/siguiente y el timer de autoplay. Tecnología: scroll snapping nativo más springs en JS y keyframes CSS para el chrome. Propósito: hacer que hojear la tira de premios parezca barajar cartas físicas.',
    },
    'about-text': {
      alt: 'Párrafo del About revelando sus caracteres uno por uno',
      longdesc:
        'Los párrafos de biografía en la sección About. Animación: el texto se revela carácter por carácter en el orden de las frases — cada letra aparece/se mueve en su propio tiempo, así el párrafo parece escribirse solo. Disparador: se reproduce cuando la sección entra en la viewport. Tecnología: JS secuencia spans por carácter con timing dirigido por rAF; el CSS maneja la transición por carácter. Propósito: darle a la bio una cadencia de máquina de escribir/voz acorde a los títulos draw-text.',
    },
    'related-tile': {
      alt: 'Tarjeta de proyecto relacionado elevándose y haciendo zoom en hover',
      longdesc:
        'Las tarjetas de proyectos relacionados al final de las páginas de proyecto. Animación: en hover la tarjeta se eleva, la imagen hace un zoom suave y título/descripción suben — todo con easing de resorte amortiguado (springs sintetizados en CSS linear()) para que el movimiento pase ligeramente y se asiente de forma orgánica; un brillo barre el borde de la tarjeta. Disparador: hover/foco del puntero. Tecnología: transiciones CSS en transform/opacity dirigidas por curvas de resorte. Propósito: hacer que la affordance de navegación se sienta física e invitante.',
    },
    'note-dot': {
      alt: 'Marcador de nota pulsando suavemente',
      longdesc:
        'Los pequeños marcadores de nota/punto usados en las páginas de internals (documentación e internas de proyecto). Animación: el punto pulsa suavemente — un loop respirante de escala y fade. Disparador: hace loop continuamente en pantalla. Tecnología: un keyframe CSS (note-dot-pulse). Propósito: marcar el elemento como anotación viva sin exigir atención.',
    },
    'body-glow': {
      alt: 'Brillo ambiente de la página derivando atrás del contenido',
      longdesc:
        'El brillo de fondo ambiente atrás del contenido de la página. Animación: un gran gradiente radial suave deriva lentamente por el documento, cambiando posición e intensidad en un loop largo. Disparador: corre continuamente en todas las páginas. Tecnología: un keyframe CSS (body-glow-drift) animando una capa de fondo fija — cero JavaScript. Propósito: darle atmósfera y profundidad al tema oscuro en lugar de un fondo plano.',
    },
  },
  riv: {
    'progress-bar': {
      alt: 'Barra de progreso de rota percorrendo o topo durante a navegação',
      longdesc:
        'La barra fina de progreso fija en el borde superior de la viewport. Animación: un transform scaleX recorre la barra de cero hasta unos setenta por ciento en algunos segundos mientras el cambio de ruta sigue en marcha, después llega a cien por ciento y se desvanece en el lugar cuando la vista de destino resuelve — nunca retrocede visiblemente. Disparador: arranca en cada navegación interna y termina cuando la nueva vista monta. Tecnología: transiciones CSS en transform y opacity dirigidas por dos clases de estado — cero JavaScript por frame. Propósito: comunicar que una transición de página está en curso, al estilo nprogress.',
    },
    'burger-button': {
      alt: 'Botón del menú hamburguesa con animación de morph líquido',
      longdesc:
        'El botón de menú hamburguesa en el rincón superior derecho de todas las páginas. Animación: morph líquido entre el ícono de tres líneas y la equis de cerrar — los trazos se curvan y se funden como fluido, en vez de girar rígidamente. Disparador: toca al hacer clic/toque cuando el menú abre y revierte cuando cierra; el hover cambia la tensión de los trazos. Tecnología: widget en canvas dirigido por Rust/WASM (shader de fragmento WebGL), con variante en worker WebGPU/OffscreenCanvas y fallback en CSS puro. Propósito: comunicar el estado abierto/cerrado del menú con una transición táctil y física.',
    },
    'nav-menu-background': {
      alt: 'Fondo animado de pantalla completa del menú con campo de contornos fluido',
      longdesc:
        'El fondo de pantalla completa pintado atrás del overlay del menú de navegación. Animación: un campo de contornos fractales en movimiento lento — capas de ruido fbm derivan y se remodelan continuamente, como espejismo de calor o plasma. Disparador: arranca cuando el menú hamburguesa abre, se frena y se descarta cuando cierra. Tecnología: shader de fragmento WebGL (fbm en GLSL) en un canvas dedicado, con variante WebGPU/OffscreenCanvas en worker y fallback de gradiente CSS estático. Propósito: darle al menú una profundidad atmosférica viva en lugar de un panel de color plano.',
    },
    'nav-menu': {
      alt: 'Ítems del menú de navegación con entrada ascendente escalonada',
      longdesc:
        'El overlay del menú de navegación que abre por el botón hamburguesa. Animación: cada ítem entra con subida y fade escalonados (nav-menu-item-in), deslizándose unos píxeles para arriba mientras aparece; un destello de membrana/plasma deriva por el panel en loop lento. Disparador: la entrada toca una vez por apertura, secuenciada de arriba abajo; la deriva de la membrana hace loop mientras el menú está abierto. Tecnología: keyframes CSS con delays por ítem, cero JavaScript por frame. Propósito: secuenciar los enlaces para que el ojo los lea en orden en vez de un flash único.',
    },
    'nav-flag': {
      alt: 'Ícono de bandera del idioma con animación de onda y entrada',
      longdesc:
        'El pequeño canvas de bandera al lado de la etiqueta de idioma en la barra de navegación. Animación: la tela de la bandera ondula con una ondulación senoidal y el glifo entero entra con escala (nav-flag-in) cuando la nav monta o el idioma cambia. Tecnología: widget canvas que renderiza la bandera proceduralmente (banderas de países divididos se componen), con el keyframe CSS cuidando de la entrada. Propósito: marcar el idioma activo con una bandera que parece tela, no un ícono plano.',
    },
    'switch-slider': {
      alt: 'Interruptor de preferencia con deslizamiento líquido del pulgar',
      longdesc:
        'Los interruptores de prendido/apagado adentro del diálogo de preferencias (apariencia, movimiento, efectos). Animación: el pulgar se desliza por el riel con estiramiento líquido — se alarga durante el trayecto y vuelve al reposo, como una gota. Disparador: toca al hacer clic/toque o alternar por teclado. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) pintando riel y pulgar, con fallback CSS para motores sin WebGL. Propósito: darle tacto al estado binario y confirmar que la alternancia pasó.',
    },
    'theme-slider': {
      alt: 'Alternador de tema con deslizamiento orbital día/noche',
      longdesc:
        'El interruptor de tema claro/oscuro en el diálogo de preferencias y la navegación. Animación: el pulgar viaja como un cuerpo orbital — un disco día/noche atraviesa el riel mientras glifos de sol/luna hacen crossfade adentro de él. Disparador: toca al alternar; también una vez al cargar cuando el tema guardado difiere del predeterminado. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) con fallback CSS. Propósito: narrar el cambio de tema como un amanecer/atardecer en vez de un flip binario.',
    },
    'close-button': {
      alt: 'Botón de cerrar con relleno líquido y equis giratoria',
      longdesc:
        'El botón circular de cerrar de los modales y del lightbox de medios expandido. Animación: en hover un relleno líquido sube adentro del círculo mientras los trazos de la equis rotan y se tensan; al apretar, el relleno se traba. Disparador: hover/foco lo arma, apretar lo libera. Tecnología: widget WebGL/canvas (dirigido por Rust/WASM) con un botón CSS simple abajo para motores sin WebGL. Propósito: darle al cerrar una sensación física y satisfactoria de apriete.',
    },
    skeleton: {
      alt: 'Esqueleto de carga con celdas en morph y brillo',
      longdesc:
        'Los esqueletos de placeholder exhibidos donde el contenido todavía carga (figuras de medios, bloques de texto, tiles de proyecto). Animación: celdas de glifo hacen morph entre formas 0/1 mientras un brillo en gradiente atraviesa la superficie de izquierda a derecha (skeleton-shimmer). Disparador: corre continuamente mientras el contenido carga, después entrega al elemento real. Tecnología: widget canvas (morph de celdas dirigido por Rust/WASM) más el keyframe CSS del shimmer. Propósito: señalar "el contenido llega" con movimiento que anticipa el layout en vez de un spinner.',
    },
    'intro-loader': {
      alt: 'Loader de introducción con anillos contrarrotativos y progreso',
      longdesc:
        'El loader de boot de pantalla completa exhibido mientras cargan los primeros assets del sitio. Animación: dos anillos giran en direcciones opuestas (intro-loader-spin-cw/ccw) alrededor de un contador de porcentaje y mensajes de etapa localizados. Disparador: corre desde la carga de la página hasta que el bundle de boot queda listo, cuando el loader entero se desvanece y se remueve. Tecnología: keyframes CSS girando los anillos; el JS apenas reporta progreso. Propósito: mantener el primer paint vivo y legible durante la secuencia de boot de tiers/polyfills.',
    },
    'site-toast': {
      alt: 'Toast de notificación deslizándose desde el rincón',
      longdesc:
        'El pequeño toast de notificación que aparece en un rincón de la pantalla para eventos como confirmaciones de copia y acciones de cookies. Animación: se desliza desde el borde mientras sube con fade (site-toast-in), aguanta y sale deslizándose de vuelta con fade. Disparador: disparado por eventos de la app (copia, aviso de almacenamiento, notificación de prueba). Tecnología: keyframes CSS en la entrada y un modificador --closing en la salida. Propósito: atraer el ojo a un mensaje transitorio sin bloquear la interacción.',
    },
    'mosaic-burn': {
      alt: 'Título del tile de portafolio quemándose en brasas y rearmándose',
      longdesc:
        'El texto del título en los tiles del mosaico de trabajos destacados. Animación: en hover las letras del título entran en combustión — bordes erosionados, estelas de quemado y partículas de brasa incandescente consumen los glifos columna por columna, y las letras se reconstruyen de abajo para arriba por el mismo campo de fuego cuando el puntero sale o el hover cambia de objetivo. Disparador: hover del puntero en el tile. Tecnología: simulación de partículas en Rust/WASM (crate mosaic-burn) corriendo el modelo erode/scorch/ember en un canvas; un camino 2D-canvas renderiza el mismo campo cuando la ruta GPU está apagada — los dos comparten una simulación determinística. Propósito: transformar el hover simple en el efecto de fuego insignia del sitio.',
    },
    'mosaic-tile': {
      alt: 'Tile de portafolio deslizándose a nuevo slot con resorte + brillo en el borde',
      longdesc:
        'Las tarjetas de proyecto en el mosaico de trabajos destacados. Animación: cuando una tarjeta se expande en hover, los vecinos desplazados se deslizan a sus nuevos slots con un resorte amortiguado — una curva orgánica de overshoot y asentamiento (resorte sintetizado en CSS linear()) en vez de un deslizamiento lineal; un brillo recorre periódicamente el borde de cada tile. Disparador: el repack por hover anima los tiles desplazados; el brillo del borde hace loop suave. Tecnología: pack masonry en JS + transición CSS en transform; el brillo es una pasada de anillo en canvas. Propósito: mantener la pared líquida y viva mientras se reordena.',
    },
    'media-progressive': {
      alt: 'Imagen de medios pasando de borrosa en baja calidad a nítida en alta',
      longdesc:
        'Cada figura de medios del sitio (imágenes y videos de los proyectos). Animación: un placeholder de baja resolución pinta primero, después hace morph al asset de alta resolución decodificado — la capa de alta se resuelve desde el estado borroso/ampliado del thumb en vez de parpadear, así el ojo lee una nitidez continua. Disparador: arranca cuando la figura entra en la viewport (IntersectionObserver) y el asset termina el decode en el pool WASM. Tecnología: decode de imagen WASM fuera del hilo principal, cambio a blob-URL y morph en CSS/canvas. Propósito: hacer que la carga progresiva parezca la imagen entrando en foco, no un reemplazo duro.',
    },
    'glitch-portrait': {
      alt: 'Retrato del About con animación de corrupción glitch VHS',
      longdesc:
        'La imagen del retrato en la sección About. Animación: corrupción periódica estilo VHS — rollos de scanline, separación de canales, desplazamiento de bloques y bandas de ruido barren la foto brevemente antes de que vuelva limpia. Disparador: corre en un timer aleatorio mientras la sección está en pantalla. Tecnología: pasada de shader de fragmento WebGL en la textura del retrato con fallback canvas. Propósito: darle al retrato una personalidad viva de video analógico, acorde a la estética técnica del sitio.',
    },
    'divider-sheen': {
      alt: 'Divisor del pie con un brillo de luz viajero',
      longdesc:
        'Los divisores hairline que separan secciones de página y columnas del pie. Animación: una banda suave de luz viaja lentamente por el hilo, barriendo de punta a punta en loop continuo. Disparador: corre continuamente mientras el divisor está en pantalla. Tecnología: widget canvas pintando la línea más la banda de gradiente en movimiento. Propósito: elevar una regla estática a un detalle sutil y vivo.',
    },
    'text-draw': {
      alt: 'Texto dibujándose letra por letra como manuscrito',
      longdesc:
        'Títulos de sección, enlaces y leyendas con el tratamiento draw-text en todo el sitio. Animación: cada carácter se dibuja estilo trazo de pluma en orden de lectura — los trazos se escriben secuencialmente como caligrafía o plotter, con agrupación opcional por palabra. Disparador: toca cuando el elemento entra en la viewport (IntersectionObserver, disparador viewport) o por dispatch explícito. Tecnología: dibujo instanciado por carácter en canvas (widget text-draw en Rust/WASM) con fallback en keyframe CSS (char-draw/word-draw). Propósito: hacer que los títulos parezcan autografiados — escritos frente a vos en vez de estampados.',
    },
    'ring-sheen': {
      alt: 'Borde de tile con brillo viajando por el anillo',
      longdesc:
        'Los contornos de borde en los tiles del mosaico y de proyectos relacionados. Animación: una banda de brillo viaja por el anillo del borde del tile como luz deslizándose en un marco, en loop periódico lento. Disparador: hace loop mientras el tile está visible; se intensifica en hover. Tecnología: pasada de anillo en canvas compuesta sobre el borde del tile. Propósito: mantener vivas las cuadrículas de tarjetas estáticas con un destello ambiente de bajo costo.',
    },
    'corner-brackets': {
      alt: 'Esquinas de botón expandiéndose en corchetes en hover',
      longdesc:
        'Las decoraciones de corchetes de esquina en los botones de acción (barras de cerrar, CTAs). Animación: los cuatro corchetes de esquina se expanden para afuera y se aclaran en hover, después se contraen de vuelta — como un retículo de enfoque de cámara trabándose. Disparador: hover/foco en el botón. Tecnología: pequeño widget canvas por botón (dibujo instanciado de corchetes) con fallback en transición CSS. Propósito: comunicar interactividad con una pista de enfoque precisa e instrumental.',
    },
    'scene-3d': {
      alt: 'Escena 3D interactiva de campo estelar y tierra',
      longdesc:
        'Las escenas 3D de pantalla completa — el experimento star-field (cuerpos celestes en órbita con etiquetas de dossier) y el playground de la tierra (planeta girando con controles de órbita). Animación: movimiento continuo inspirado en física — mecánica orbital, rotación, paralaje en el movimiento de cámara y transiciones entre cuerpos. Disparador: corre todo el tiempo que la escena está en pantalla; puntero/toque orbita la cámara. Tecnología: three.js sobre WebGL/WebGPU con el trabajo por frame en la GPU. Propósito: la vidriera 3D en tiempo real insignia del sitio.',
    },
    'genie-modal': {
      alt: 'Medio expandido abriéndose en warp líquido hacia el lightbox',
      longdesc:
        'El lightbox de medios expandidos que abre al hacer clic en una imagen o video de proyecto. Animación: el medio se deforma entre el rectángulo de la figura clicada y la caja del modal de pantalla completa como una lámina líquida — bandas horizontales se atrasan, curvan y estiran por un campo genie mientras partículas de vapor se desprenden del pliegue en movimiento; el mismo campo lo colapsa de vuelta al cerrar. Disparador: clic/toque para abrir, botón de cerrar o Escape para colapsar. Tecnología: widget WebGPU/Rust de mesh-warp + partículas en un worker fuera del hilo principal cuando está activado, un renderer 2D-canvas de bandas sin alocación por frame en todo lo demás, y un keyframe CSS de zoom como último recurso. Propósito: reemplazar un scale-fade duro por una transición física estilo dock de macOS.',
    },
    carousel: {
      alt: 'Carrusel de premios deslizando con momentum y barra de progreso',
      longdesc:
        'El carrusel horizontal de premios en el pie de la home. Animación: los ítems se deslizan con momentum y hacen snap en su posición; una barra de progreso se llena a lo largo del riel, un trazo de autoplay anima el temporizador y los controles de acción aparecen. Disparador: gestos de arrastre/scroll, controles anterior/siguiente y el timer de autoplay. Tecnología: scroll snapping nativo más springs en JS y keyframes CSS para el chrome. Propósito: hacer que hojear la tira de premios parezca barajar cartas físicas.',
    },
    'about-text': {
      alt: 'Párrafo del About revelando sus caracteres uno por uno',
      longdesc:
        'Los párrafos de biografía en la sección About. Animación: el texto se revela carácter por carácter en el orden de las frases — cada letra aparece/se mueve en su propio tiempo, así el párrafo parece escribirse solo. Disparador: toca cuando la sección entra en la viewport. Tecnología: JS secuencia spans por carácter con timing dirigido por rAF; el CSS cuida de la transición por carácter. Propósito: darle a la bio una cadencia de máquina de escribir/voz acorde a los títulos draw-text.',
    },
    'related-tile': {
      alt: 'Tarjeta de proyecto relacionado elevándose y haciendo zoom en hover',
      longdesc:
        'Las tarjetas de proyectos relacionados al final de las páginas de proyecto. Animación: en hover la tarjeta se eleva, la imagen hace un zoom suave y título/descripción suben — todo con easing de resorte amortiguado (springs sintetizados en CSS linear()) para que el movimiento pase ligeramente y se asiente de forma orgánica; un brillo barre el borde de la tarjeta. Disparador: hover/foco del puntero. Tecnología: transiciones CSS en transform/opacity dirigidas por curvas de resorte. Propósito: hacer que la affordance de navegación se sienta física e invitante.',
    },
    'note-dot': {
      alt: 'Marcador de nota pulsando suavemente',
      longdesc:
        'Los pequeños marcadores de nota/punto usados en las páginas de internals (documentación e internas de proyecto). Animación: el punto pulsa suavemente — un loop respirante de escala y fade. Disparador: hace loop continuamente en pantalla. Tecnología: un keyframe CSS (note-dot-pulse). Propósito: marcar el elemento como anotación viva sin exigir atención.',
    },
    'body-glow': {
      alt: 'Brillo ambiente de la página derivando atrás del contenido',
      longdesc:
        'El brillo de fondo ambiente atrás del contenido de la página. Animación: un gran gradiente radial suave deriva lentamente por el documento, cambiando posición e intensidad en un loop largo. Disparador: corre continuamente en todas las páginas. Tecnología: un keyframe CSS (body-glow-drift) animando una capa de fondo fija — cero JavaScript. Propósito: darle atmósfera y profundidad al tema oscuro en lugar de un fondo plano.',
    },
  },
  it: {
    'progress-bar': {
      alt: 'Barra di avanzamento di rotta che attraversa il bordo superiore durante la navigazione',
      longdesc:
        'La sottile barra di avanzamento fissata sul bordo superiore del viewport. Animazione: un transform scaleX fa scorrere la barra da zero a circa il settanta per cento in alcuni secondi mentre il cambio di rotta è in corso, poi completa fino al cento per cento e sfuma sul posto quando la vista di destinazione è pronta — non retrocede mai visibilmente. Trigger: parte a ogni navigazione interna e termina quando la nuova vista è montata. Tecnologia: transizioni CSS su transform e opacity pilotate da due classi di stato — zero JavaScript per frame. Scopo: comunicare che una transizione di pagina è in corso, in stile nprogress.',
    },
    'burger-button': {
      alt: 'Pulsante menu hamburger con animazione morph liquida',
      longdesc:
        "Il pulsante del menu hamburger nell'angolo in alto a destra di ogni pagina. Animazione: morph liquido tra l'icona a tre linee e la X di chiusura — i tratti si curvano e si fondono come fluido invece di ruotare rigidamente. Trigger: parte al clic/tap quando il menu si apre e si inverte quando si chiude; l'hover cambia la tensione dei tratti. Tecnologia: widget canvas guidato da Rust/WASM (fragment shader WebGL), con variante worker WebGPU/OffscreenCanvas e fallback CSS puro. Scopo: comunicare lo stato aperto/chiuso del menu con una transizione tattile e fisica.",
    },
    'nav-menu-background': {
      alt: 'Sfondo animato a schermo intero del menu con campo di contorni fluido',
      longdesc:
        "Lo sfondo a schermo intero dipinto dietro l'overlay del menu di navigazione. Animazione: un campo di contorni frattali in lento movimento — strati di rumore fbm derivano e si rimodellano continuamente, come miraggio di calore o plasma. Trigger: parte quando il menu hamburger si apre, si ferma e viene smaltito alla chiusura. Tecnologia: fragment shader WebGL (fbm in GLSL) su canvas dedicato, con variante WebGPU/OffscreenCanvas su worker e fallback gradiente CSS statico. Scopo: dare al menu una profondità atmosferica viva invece di un pannello a tinta piatta.",
    },
    'nav-menu': {
      alt: 'Voci del menu di navigazione con entrata ascendente scaglionata',
      longdesc:
        "L'overlay del menu di navigazione che si apre dal pulsante hamburger. Animazione: ogni voce entra con salita e fade scaglionati (nav-menu-item-in), scivolando di qualche pixel verso l'alto mentre appare; un bagliore membrana/plasma deriva sul pannello in loop lento. Trigger: l'entrata parte una volta per apertura, sequenziata dall'alto in basso; la deriva della membrana gira in loop finché il menu è aperto. Tecnologia: keyframe CSS con delay per voce, zero JavaScript per frame. Scopo: sequenziare i link così l'occhio li legge in ordine invece di un flash unico.",
    },
    'nav-flag': {
      alt: 'Icona bandiera della lingua con animazione onda e entrata',
      longdesc:
        "Il piccolo canvas bandiera accanto all'etichetta della lingua nella barra di navigazione. Animazione: la stoffa della bandiera ondula con un ripple sinusoidale e il glifo intero entra in scala (nav-flag-in) quando la nav monta o la lingua cambia. Tecnologia: widget canvas che renderizza la bandiera proceduralmente (le bandiere di paesi divisi sono composte), con il keyframe CSS che gestisce l'entrata. Scopo: segnare la lingua attiva con una bandiera che sembra tessuto, non un'icona piatta.",
    },
    'switch-slider': {
      alt: 'Interruttore di preferenza con scivolata liquida del pollice',
      longdesc:
        "Gli interruttori on/off dentro il dialogo delle preferenze (aspetto, movimento, effetti). Animazione: il pollice scivola lungo il binario con allungamento liquido — si allunga durante il tragitto e torna a riposo, come una goccia. Trigger: parte al clic/tap o all'alternanza da tastiera. Tecnologia: widget WebGL/canvas (guidato da Rust/WASM) che dipinge binario e pollice, con fallback CSS per motori senza WebGL. Scopo: rendere tattile lo stato binario e confermare che l'alternanza è avvenuta.",
    },
    'theme-slider': {
      alt: 'Selettore tema con scivolata orbitale giorno/notte',
      longdesc:
        "L'interruttore tema chiaro/scuro nel dialogo preferenze e nella navigazione. Animazione: il pollice viaggia come un corpo orbitale — un disco giorno/notte attraversa il binario mentre glifi sole/luna fanno crossfade al suo interno. Trigger: parte all'alternanza; anche una volta al caricamento quando il tema salvato differisce dal predefinito. Tecnologia: widget WebGL/canvas (guidato da Rust/WASM) con fallback CSS. Scopo: raccontare il cambio tema come un'alba/tramonto invece di un flip binario.",
    },
    'close-button': {
      alt: 'Pulsante chiudi con riempimento liquido e X rotante',
      longdesc:
        'Il pulsante circolare di chiusura dei modal e del lightbox media espanso. Animazione: in hover un riempimento liquido sale dentro il cerchio mentre i tratti della X ruotano e si tendono; alla pressione il riempimento scatta. Trigger: hover/focus lo arma, la pressione lo rilascia. Tecnologia: widget WebGL/canvas (guidato da Rust/WASM) con un semplice pulsante CSS sotto per motori senza WebGL. Scopo: dare alla chiusura una sensazione fisica e appagante di pressione.',
    },
    skeleton: {
      alt: 'Scheletro di caricamento con celle in morph e shimmer',
      longdesc:
        'Gli scheletri placeholder mostrati dove il contenuto sta ancora caricando (figure media, blocchi di testo, tile di progetto). Animazione: celle di glifo fanno morph tra forme 0/1 mentre un bagliore a gradiente attraversa la superficie da sinistra a destra (skeleton-shimmer). Trigger: gira continuamente mentre il contenuto carica, poi consegna all\'elemento reale. Tecnologia: widget canvas (morph di celle guidato da Rust/WASM) più il keyframe CSS dello shimmer. Scopo: segnalare "il contenuto arriva" con un movimento che anticipa il layout invece di uno spinner.',
    },
    'intro-loader': {
      alt: 'Loader di introduzione con anelli controrotanti e progresso',
      longdesc:
        "Il loader di avvio a schermo intero mostrato mentre i primi asset del sito caricano. Animazione: due anelli girano in direzioni opposte (intro-loader-spin-cw/ccw) attorno a un contatore di percentuale e messaggi di fase localizzati. Trigger: gira dal caricamento della pagina finché il bundle di avvio è pronto, poi l'intero loader sfuma e si rimuove. Tecnologia: keyframe CSS che fanno girare gli anelli; il JS riporta solo il progresso. Scopo: tenere il primo paint vivo e leggibile durante la sequenza di avvio tier/polyfill.",
    },
    'site-toast': {
      alt: "Toast di notifica che scivola dall'angolo",
      longdesc:
        "Il piccolo toast di notifica che appare in un angolo dello schermo per eventi come conferme di copia e azioni sui cookie. Animazione: scivola dal bordo mentre sfuma in alto (site-toast-in), tiene, poi esce scivolando indietro con fade. Trigger: innescato da eventi dell'app (copia, avviso storage, notifica di test). Tecnologia: keyframe CSS in entrata e un modificatore --closing in uscita. Scopo: attirare l'occhio su un messaggio transitorio senza bloccare l'interazione.",
    },
    'mosaic-burn': {
      alt: 'Titolo del tile portfolio che brucia in braci e si ricompone',
      longdesc:
        "Il testo del titolo sui tile del mosaico dei lavori in evidenza. Animazione: in hover le lettere del titolo entrano in combustione — bordi erosi, scie di bruciatura e particelle di brace incandescente consumano i glifi colonna per colonna, e le lettere si ricostruiscono dal basso verso l'alto attraverso lo stesso campo di fuoco quando il puntatore esce o l'hover cambia bersaglio. Trigger: hover del puntatore sul tile. Tecnologia: simulazione particellare in Rust/WASM (crate mosaic-burn) che esegue il modello erode/scorch/ember su canvas; un percorso 2D-canvas renderizza lo stesso campo quando la rotta GPU è spenta — entrambi condividono una simulazione deterministica. Scopo: trasformare il semplice hover nell'effetto fuoco firma del sito.",
    },
    'mosaic-tile': {
      alt: 'Tile portfolio che scivola in nuovo slot a molla + bagliore sul bordo',
      longdesc:
        'Le card di progetto nel mosaico dei lavori in evidenza. Animazione: quando una card si espande in hover, i vicini spostati scivolano nei nuovi slot con una molla smorzata — una curva organica di overshoot e assestamento (molla sintetizzata in CSS linear()) invece di uno scivolo lineare; un bagliore percorre periodicamente il bordo di ogni tile. Trigger: il repack da hover anima i tile spostati; il bagliore del bordo gira in loop lieve. Tecnologia: pack masonry in JS + transizione CSS su transform; il bagliore è un passaggio ad anello su canvas. Scopo: mantenere la parete liquida e viva mentre si riordina.',
    },
    'media-progressive': {
      alt: 'Immagine media che passa da sfocata a bassa qualità a nitida in alta',
      longdesc:
        "Ogni figura media del sito (immagini e video dei progetti). Animazione: un placeholder a bassa risoluzione dipinge prima, poi fa morph verso l'asset ad alta risoluzione decodificato — il layer in alta si risolve dallo stato sfocato/ingrandito della thumb invece di lampeggiare, così l'occhio legge una nitidezza continua. Trigger: parte quando la figura entra nella viewport (IntersectionObserver) e l'asset finisce il decode nel pool WASM. Tecnologia: decode immagine WASM fuori dal thread principale, swap a blob-URL e morph in CSS/canvas. Scopo: rendere il caricamento progressivo come l'immagine che entra a fuoco, non una sostituzione secca.",
    },
    'glitch-portrait': {
      alt: 'Ritratto About con animazione di corruzione glitch VHS',
      longdesc:
        "L'immagine del ritratto nella sezione About. Animazione: corruzione periodica stile VHS — rolli di scanline, separazione dei canali, spostamenti di blocchi e bande di rumore spazzano brevemente la foto prima che torni pulita. Trigger: gira su un timer casuale finché la sezione è sullo schermo. Tecnologia: passaggio di fragment shader WebGL sulla texture del ritratto con fallback canvas. Scopo: dare al ritratto una personalità viva da video analogico, in linea con l'estetica tecnica del sitio.",
    },
    'divider-sheen': {
      alt: 'Divisore del footer con un bagliore di luce viaggiante',
      longdesc:
        "I divisori hairline che separano sezioni di pagina e colonne del footer. Animazione: una banda morbida di luce viaggia lentamente lungo il filo, spazzando da un capo all'altro in loop continuo. Trigger: gira continuamente finché il divisore è sullo schermo. Tecnologia: widget canvas che dipinge la linea più la banda a gradiente in movimento. Scopo: elevare una riga statica a un dettaglio sottile e vivo.",
    },
    'text-draw': {
      alt: 'Testo che si disegna lettera per lettera come manoscritto',
      longdesc:
        "Titoli di sezione, link e didascalie con il trattamento draw-text in tutto il sito. Animazione: ogni carattere è disegnato stile tratto di penna in ordine di lettura — i tratti si scrivono sequenzialmente come calligrafia o plotter, con raggruppamento opzionale per parola. Trigger: parte quando l'elemento entra nella viewport (IntersectionObserver, trigger viewport) o su dispatch esplicito. Tecnologia: disegno instanziato per carattere su canvas (widget text-draw in Rust/WASM) con fallback keyframe CSS (char-draw/word-draw). Scopo: far sembrare i titoli autografati — scritti davanti a te invece di timbrati.",
    },
    'ring-sheen': {
      alt: "Bordo tile con bagliore che viaggia attorno all'anello",
      longdesc:
        "I contorni di bordo sui tile del mosaico e dei progetti correlati. Animazione: una banda di bagliore viaggia attorno all'anello del bordo del tile come luce che scivola su una cornice, in loop periodico lento. Trigger: gira in loop finché il tile è visibile; si intensifica in hover. Tecnologia: passaggio ad anello su canvas composto sopra il bordo del tile. Scopo: mantenere vive le griglie di card statiche con un riflesso ambientale economico.",
    },
    'corner-brackets': {
      alt: 'Angoli di pulsante che espandono in parentesi su hover',
      longdesc:
        "Le decorazioni a parentesi angolari sui pulsanti di azione (barre di chiusura, CTA). Animazione: le quattro parentesi angolari si espandono verso l'esterno e si illuminano in hover, poi si contraggono — come un reticolo di messa a fuoco di fotocamera che scatta. Trigger: hover/focus sul pulsante. Tecnologia: piccolo widget canvas per pulsante (disegno instanziato di parentesi) con fallback a transizione CSS. Scopo: comunicare interattività con un indizio di focus preciso e strumentale.",
    },
    'scene-3d': {
      alt: 'Scena 3D interattiva di campo stellare e terra',
      longdesc:
        "Le scene 3D a schermo intero — l'esperimento star-field (corpi celesti in orbita con etichette dossier) e il playground della terra (pianeta che ruota con controlli di orbita). Animazione: movimento continuo ispirato alla fisica — meccanica orbitale, rotazione, parallasse al movimento di camera e transizioni tra corpi. Trigger: gira per tutto il tempo in cui la scena è sullo schermo; puntatore/tocco orbita la camera. Tecnologia: three.js su WebGL/WebGPU con il lavoro per frame mantenuto sulla GPU. Scopo: la vetrina 3D in tempo reale firma del sito.",
    },
    'genie-modal': {
      alt: 'Media espanso che si apre in warp liquido verso il lightbox',
      longdesc:
        "Il lightbox media espanso che si apre cliccando su un'immagine o un video di progetto. Animazione: il media si deforma tra il rettangolo della figura cliccata e la scatola del modal a schermo intero come un foglio liquido — bande orizzontali ritardano, si incurvano e si stirano attraverso un campo genie mentre particelle di vapore si staccano dalla piega in movimento; lo stesso campo lo collassa indietro alla chiusura. Trigger: clic/tap per aprire, pulsante chiudi o Escape per collassare. Tecnologia: widget WebGPU/Rust mesh-warp + particelle su un worker fuori dal thread principale quando abilitato, un renderer 2D-canvas a bande senza allocazioni per frame ovunque altro, e un keyframe CSS di zoom come ultima risorsa. Scopo: sostituire un secco scale-fade con una transizione fisica in stile dock macOS.",
    },
    carousel: {
      alt: 'Carosello premi che scivola con momentum e barra di progresso',
      longdesc:
        'Il carosello orizzontale dei premi nel footer della home. Animazione: le voci scivolano con momentum e fanno snap in posizione; una barra di progresso si riempie lungo il binario, un tratto di autoplay anima il timer e i controlli di azione compaiono. Trigger: gesti di trascinamento/scroll, controlli precedente/successivo e il timer di autoplay. Tecnologia: scroll snapping nativo più springs in JS e keyframe CSS per il chrome. Scopo: far sembrare lo sfoglio della striscia dei premi come mescolare carte fisiche.',
    },
    'about-text': {
      alt: 'Paragrafo About che rivela i suoi caratteri uno a uno',
      longdesc:
        "I paragrafi della biografia nella sezione About. Animazione: il testo si rivela carattere per carattere nell'ordine delle frasi — ogni lettera sfuma/si muove nel proprio tempo, così il paragrafo sembra scriversi da solo. Trigger: parte quando la sezione entra nella viewport. Tecnologia: JS sequenzia span per carattere con timing guidato da rAF; il CSS gestisce la transizione per carattere. Scopo: dare alla bio una cadenza da macchina da scrivere/voce in linea con i titoli draw-text.",
    },
    'related-tile': {
      alt: 'Card progetto correlato che si solleva e zooma su hover',
      longdesc:
        "Le card dei progetti correlati in fondo alle pagine di progetto. Animazione: in hover la card si solleva, la sua immagine zooma dolcemente e titolo/descrizione scivolano su — tutto con easing a molla smorzata (springs sintetizzati in CSS linear()) così il movimento supera leggermente e si assesta in modo organico; un bagliore spazza il bordo della card. Trigger: hover/focus del puntatore. Tecnologia: transizioni CSS su transform/opacity guidate da curve a molla. Scopo: rendere l'affordance di navigazione fisica e invitante.",
    },
    'note-dot': {
      alt: 'Marcatore di nota che pulsa dolcemente',
      longdesc:
        "I piccoli marcatori di nota/punto usati nelle pagine internals (documentazione e interne di progetto). Animazione: il punto pulsa dolcemente — un loop respirante di scala e fade. Trigger: gira in loop continuo sullo schermo. Tecnologia: un keyframe CSS (note-dot-pulse). Scopo: segnare l'elemento come annotazione viva senza esigere attenzione.",
    },
    'body-glow': {
      alt: 'Bagliore ambientale della pagina che deriva dietro il contenuto',
      longdesc:
        'Il bagliore di sfondo ambientale dietro il contenuto della pagina. Animazione: un grande gradiente radiale morbido deriva lentamente attraverso il documento, cambiando posizione e intensità in un loop lungo. Trigger: gira continuamente su ogni pagina. Tecnologia: un keyframe CSS (body-glow-drift) che anima un layer di sfondo fisso — zero JavaScript. Scopo: dare atmosfera e profondità al tema scuro invece di uno sfondo piatto.',
    },
  },
  fr: {
    'progress-bar': {
      alt: 'Barre de progression de route défilant en haut pendant la navigation',
      longdesc:
        "La fine barre de progression fixée en haut de la fenêtre. Animation : une transformation scaleX balaie la barre de zéro à environ soixante-dix pour cent en quelques secondes pendant qu'un changement de route est en cours, puis elle atteint cent pour cent et s'estompe sur place quand la vue de destination est prête — elle ne recule jamais visiblement. Déclencheur : démarre à chaque navigation interne et s'achève quand la nouvelle vue est montée. Technologie : transitions CSS sur transform et opacity pilotées par deux classes d'état — zéro JavaScript par frame. But : signaler qu'une transition de page est en cours, dans le style nprogress.",
    },
    'burger-button': {
      alt: 'Bouton menu hamburger avec animation morph liquide',
      longdesc:
        "Le bouton du menu hamburger en haut à droite de chaque page. Animation : morph liquide entre l'icône à trois lignes et le X de fermeture — les traits se courbent et fusionnent comme un fluide au lieu de tourner rigidement. Déclencheur : se joue au clic/toucher à l'ouverture du menu et s'inverse à la fermeture ; le survol modifie la tension des traits. Technologie : widget canvas piloté par Rust/WASM (shader de fragment WebGL), avec variante worker WebGPU/OffscreenCanvas et repli CSS pur. Objectif : communiquer l'état ouvert/fermé du menu par une transition tactile et physique.",
    },
    'nav-menu-background': {
      alt: 'Fond animé plein écran du menu avec champ de contours fluide',
      longdesc:
        "Le fond plein écran peint derrière l'overlay du menu de navigation. Animation : un champ de contours fractals en lent mouvement — des couches de bruit fbm dérivent et se remodelent en continu, comme un mirage de chaleur ou du plasma. Déclencheur : démarre à l'ouverture du menu hamburger, s'arrête et se détruit à la fermeture. Technologie : shader de fragment WebGL (fbm en GLSL) sur canvas dédié, avec variante WebGPU/OffscreenCanvas en worker et repli dégradé CSS statique. Objectif : donner au menu une profondeur atmosphérique vivante plutôt qu'un panneau de couleur plate.",
    },
    'nav-menu': {
      alt: 'Éléments du menu de navigation avec entrée ascendante échelonnée',
      longdesc:
        "L'overlay du menu de navigation qui s'ouvre depuis le bouton hamburger. Animation : chaque élément entre avec une montée et un fade échelonnés (nav-menu-item-in), glissant de quelques pixels vers le haut en apparaissant ; un reflet membrane/plasma dérive sur le panneau en boucle lente. Déclencheur : l'entrée se joue une fois par ouverture, séquencée de haut en bas ; la dérive de la membrane boucle tant que le menu est ouvert. Technologie : keyframes CSS avec délais par élément, zéro JavaScript par frame. Objectif : séquencer les liens pour que l'œil les lise dans l'ordre plutôt qu'en un seul flash.",
    },
    'nav-flag': {
      alt: 'Icône de drapeau de langue avec animation vague et entrée',
      longdesc:
        "Le petit canvas de drapeau à côté du libellé de langue dans la barre de navigation. Animation : le tissu du drapeau ondule avec une ondulation sinusoïdale et le glyphe entier entre en échelle (nav-flag-in) quand la nav monte ou que la langue change. Technologie : widget canvas qui rend le drapeau procéduralement (les drapeaux de pays partagés sont composés), le keyframe CSS gérant l'entrée. Objectif : marquer la langue active avec un drapeau qui ressemble à du tissu, pas à une icône plate.",
    },
    'switch-slider': {
      alt: 'Interrupteur de préférence avec glissement liquide du pouce',
      longdesc:
        "Les interrupteurs on/off dans le dialogue des préférences (apparence, mouvement, effets). Animation : le pouce glisse le long du rail avec un étirement liquide — il s'allonge pendant le trajet et revient au repos, comme une goutte. Déclencheur : se joue au clic/toucher ou à la bascule clavier. Technologie : widget WebGL/canvas (piloté par Rust/WASM) peignant rail et pouce, avec repli CSS pour les moteurs sans WebGL. Objectif : rendre l'état binaire tactile et confirmer que la bascule a eu lieu.",
    },
    'theme-slider': {
      alt: 'Sélecteur de thème avec glissement orbital jour/nuit',
      longdesc:
        "L'interrupteur de thème clair/sombre dans le dialogue des préférences et la navigation. Animation : le pouce voyage comme un corps orbital — un disque jour/nuit traverse le rail pendant que des glyphes soleil/lune font un crossfade à l'intérieur. Déclencheur : se joue à la bascule ; aussi une fois au chargement quand le thème enregistré diffère du défaut. Technologie : widget WebGL/canvas (piloté par Rust/WASM) avec repli CSS. Objectif : raconter le changement de thème comme un lever/coucher de soleil plutôt qu'un basculement binaire.",
    },
    'close-button': {
      alt: 'Bouton fermer avec remplissage liquide et X rotatif',
      longdesc:
        "Le bouton circulaire de fermeture des modales et du lightbox média étendu. Animation : au survol un remplissage liquide monte dans le cercle pendant que les traits du X tournent et se tendent ; à la pression le remplissage s'enclenche. Déclencheur : le survol/focus l'arme, la pression le libère. Technologie : widget WebGL/canvas (piloté par Rust/WASM) avec un simple bouton CSS en dessous pour les moteurs sans WebGL. Objectif : donner à la fermeture une sensation physique et satisfaisante de pression.",
    },
    skeleton: {
      alt: 'Squelette de chargement avec cellules en morph et shimmer',
      longdesc:
        "Les squelettes placeholder affichés où le contenu charge encore (figures média, blocs de texte, tuiles de projet). Animation : des cellules de glyphes morphent entre des formes 0/1 pendant qu'un reflet en dégradé traverse la surface de gauche à droite (skeleton-shimmer). Déclencheur : tourne en continu pendant le chargement du contenu, puis cède la place à l'élément réel. Technologie : widget canvas (morph de cellules piloté par Rust/WASM) plus le keyframe CSS du shimmer. Objectif : signaler « le contenu arrive » par un mouvement qui préfigure le layout plutôt qu'un spinner.",
    },
    'intro-loader': {
      alt: "Loader d'introduction avec anneaux contrarotatifs et progression",
      longdesc:
        "Le loader de démarrage plein écran affiché pendant que les premiers assets du site chargent. Animation : deux anneaux tournent en sens opposés (intro-loader-spin-cw/ccw) autour d'un compteur de pourcentage et de messages d'étape localisés. Déclencheur : tourne du chargement de la page jusqu'à ce que le bundle de démarrage soit prêt, puis le loader entier s'estompe et se retire. Technologie : keyframes CSS faisant tourner les anneaux ; le JS ne rapporte que la progression. Objectif : garder le premier paint vivant et lisible pendant la séquence de démarrage tiers/polyfills.",
    },
    'site-toast': {
      alt: 'Toast de notification glissant depuis le coin',
      longdesc:
        "Le petit toast de notification qui apparaît dans un coin de l'écran pour des événements comme les confirmations de copie et les actions de cookies. Animation : glisse depuis le bord en s'estompant vers le haut (site-toast-in), tient, puis ressort en glissant avec un fade. Déclencheur : déclenché par les événements de l'app (copie, avis de stockage, notification de test). Technologie : keyframes CSS à l'entrée et un modificateur --closing à la sortie. Objectif : attirer le regard sur un message transitoire sans bloquer l'interaction.",
    },
    'mosaic-burn': {
      alt: 'Titre de tuile portfolio brûlant en braises et se reformant',
      longdesc:
        "Le texte du titre sur les tuiles du mosaïque des travaux en vedette. Animation : au survol les lettres du titre s'embrasent — bords érodés, traînées de brûlure et particules de braise incandescente consomment les glyphes colonne par colonne, puis les lettres se reconstruisent de bas en haut à travers le même champ de feu quand le pointeur sort ou que le survol change de cible. Déclencheur : survol du pointeur sur la tuile. Technologie : simulation de particules en Rust/WASM (crate mosaic-burn) exécutant le modèle erode/scorch/ember sur canvas ; un chemin 2D-canvas rend le même champ quand la route GPU est coupée — les deux partagent une simulation déterministe. Objectif : transformer le simple survol en l'effet de feu signature du site.",
    },
    'mosaic-tile': {
      alt: 'Tuile portfolio glissant vers un nouveau slot à ressort + reflet sur le bord',
      longdesc:
        "Les cartes de projet dans le mosaïque des travaux en vedette. Animation : quand une carte s'agrandit au survol, les voisines déplacées glissent vers leurs nouveaux slots sur un ressort amorti — une courbe organique d'overshoot et d'établissement (ressort synthétisé en CSS linear()) plutôt qu'une glissade linéaire ; un reflet parcourt périodiquement le bord de chaque tuile. Déclencheur : le repack par survol anime les tuiles déplacées ; le reflet du bord boucle doucement. Technologie : pack masonry en JS + transition CSS sur transform ; le reflet est une passe en anneau sur canvas. Objectif : garder le mur liquide et vivant pendant qu'il se réarrange.",
    },
    'media-progressive': {
      alt: 'Image média passant de floue en basse qualité à nette en haute',
      longdesc:
        "Chaque figure média du site (images et vidéos des projets). Animation : un placeholder basse résolution peint d'abord, puis morphe vers l'asset haute résolution décodé — la couche haute se résout depuis l'état flou/zoomé de la thumb au lieu de clignoter, l'œil lit donc une netteté continue. Déclencheur : démarre quand la figure entre dans la viewport (IntersectionObserver) et que l'asset finit son decode dans le pool WASM. Technologie : decode d'image WASM hors du thread principal, échange en blob-URL et morph en CSS/canvas. Objectif : rendre le chargement progressif comme l'image qui entre dans le foyer, pas un remplacement sec.",
    },
    'glitch-portrait': {
      alt: 'Portrait About avec animation de corruption glitch VHS',
      longdesc:
        "L'image du portrait dans la section About. Animation : corruption périodique style VHS — rouleaux de scanline, séparation des canaux, déplacements de blocs et bandes de bruit balayent brièvement la photo avant qu'elle ne revienne nette. Déclencheur : tourne sur un minuteur aléatoire tant que la section est à l'écran. Technologie : passe de shader de fragment WebGL sur la texture du portrait avec repli canvas. Objectif : donner au portrait une personnalité vivante de vidéo analogique, dans l'esthétique technique du site.",
    },
    'divider-sheen': {
      alt: 'Séparateur de pied de page avec un reflet de lumière voyageur',
      longdesc:
        "Les séparateurs hairline qui séparent les sections de page et les colonnes du pied de page. Animation : une bande douce de lumière voyage lentement le long du fil, balayant d'un bout à l'autre en boucle continue. Déclencheur : tourne en continu tant que le séparateur est à l'écran. Technologie : widget canvas peignant la ligne plus la bande de dégradé en mouvement. Objectif : élever une règle statique en un détail subtil et vivant.",
    },
    'text-draw': {
      alt: 'Texte se dessinant lettre par lettre comme un manuscrit',
      longdesc:
        "Titres de section, liens et légendes avec le traitement draw-text sur tout le site. Animation : chaque caractère est dessiné style trait de plume dans l'ordre de lecture — les traits s'écrivent séquentiellement comme une calligraphie ou un plotter, avec regroupement optionnel par mot. Déclencheur : se joue quand l'élément entre dans la viewport (IntersectionObserver, déclencheur viewport) ou sur dispatch explicite. Technologie : dessin instancié par caractère sur canvas (widget text-draw en Rust/WASM) avec repli keyframe CSS (char-draw/word-draw). Objectif : faire paraître les titres autographiés — écrits sous vos yeux plutôt qu'estampillés.",
    },
    'ring-sheen': {
      alt: "Bord de tuile avec reflet voyageant autour de l'anneau",
      longdesc:
        "Les contours de bord sur les tuiles du mosaïque et des projets liés. Animation : une bande de reflet voyage autour de l'anneau du bord de la tuile comme une lumière glissant sur un cadre, en boucle périodique lente. Déclencheur : boucle tant que la tuile est visible ; s'intensifie au survol. Technologie : passe en anneau sur canvas compositée au-dessus du bord de la tuile. Objectif : garder vivantes les grilles de cartes statiques avec un éclat ambiant peu coûteux.",
    },
    'corner-brackets': {
      alt: "Coins de bouton s'expandant en crochets au survol",
      longdesc:
        "Les décorations en crochets d'angle sur les boutons d'action (barres de fermeture, CTA). Animation : les quatre crochets d'angle s'expandent vers l'extérieur et s'illuminent au survol, puis se contractent — comme un réticule de mise au point d'appareil photo qui se verrouille. Déclencheur : survol/focus sur le bouton. Technologie : petit widget canvas par bouton (dessin instancié de crochets) avec repli en transition CSS. Objectif : communiquer l'interactivité par un indice de focus précis et instrumental.",
    },
    'scene-3d': {
      alt: "Scène 3D interactive de champ d'étoiles et de terre",
      longdesc:
        "Les scènes 3D plein écran — l'expérience star-field (corps célestes en orbite avec étiquettes dossier) et le playground de la terre (planète tournant avec contrôles d'orbite). Animation : mouvement continu d'inspiration physique — mécanique orbitale, rotation, parallaxe au mouvement de caméra et transitions entre corps. Déclencheur : tourne tout le temps où la scène est à l'écran ; le pointeur/toucher orbite la caméra. Technologie : three.js sur WebGL/WebGPU avec le travail par frame maintenu sur le GPU. Objectif : la vitrine 3D temps réel signature du site.",
    },
    'genie-modal': {
      alt: "Média étendu s'ouvrant en warp liquide vers le lightbox",
      longdesc:
        "Le lightbox média étendu qui s'ouvre au clic sur une image ou vidéo de projet. Animation : le média se déforme entre le rectangle de la figure cliquée et la boîte du modal plein écran comme une feuille liquide — des bandes horizontales retardent, se courbent et s'étirent à travers un champ genie pendant que des particules de vapeur se détachent du pli en mouvement ; le même champ le replie à la fermeture. Déclencheur : clic/toucher pour ouvrir, bouton fermer ou Échap pour replier. Technologie : widget WebGPU/Rust mesh-warp + particules sur un worker hors du thread principal quand activé, un renderer 2D-canvas à bandes sans allocation par frame partout ailleurs, et un keyframe CSS de zoom en dernier recours. Objectif : remplacer un scale-fade sec par une transition physique style dock macOS.",
    },
    carousel: {
      alt: 'Carrousel de prix glissant avec momentum et barre de progression',
      longdesc:
        "Le carrousel horizontal des prix dans le pied de page de l'accueil. Animation : les éléments glissent avec momentum et s'enclenchent en position ; une barre de progression se remplit le long du rail, un trait d'autoplay anime le minuteur et les contrôles d'action apparaissent. Déclencheur : gestes de glisser/défiler, contrôles précédent/suivant et le minuteur d'autoplay. Technologie : scroll snapping natif plus springs en JS et keyframes CSS pour le chrome. Objectif : faire du feuilletage de la bande de prix comme mélanger des cartes physiques.",
    },
    'about-text': {
      alt: 'Paragraphe About révélant ses caractères un à un',
      longdesc:
        "Les paragraphes de biographie dans la section About. Animation : le texte se révèle caractère par caractère dans l'ordre des phrases — chaque lettre s'estompe/bouge dans son propre timing, le paragraphe semble donc s'écrire seul. Déclencheur : se joue quand la section entre dans la viewport. Technologie : JS séquence des spans par caractère avec timing piloté par rAF ; le CSS gère la transition par caractère. Objectif : donner à la bio une cadence de machine à écrire/voix en accord avec les titres draw-text.",
    },
    'related-tile': {
      alt: 'Carte de projet lié se soulevant et zoomant au survol',
      longdesc:
        "Les cartes de projets liés en bas des pages de projet. Animation : au survol la carte se soulève, son image zoome doucement et titre/description montent — le tout avec un easing de ressort amorti (springs synthétisés en CSS linear()) pour que le mouvement dépasse légèrement et s'établisse organiquement ; un reflet balaie le bord de la carte. Déclencheur : survol/focus du pointeur. Technologie : transitions CSS sur transform/opacity pilotées par des courbes de ressort. Objectif : rendre l'affordance de navigation physique et invitante.",
    },
    'note-dot': {
      alt: 'Marqueur de note pulsant doucement',
      longdesc:
        "Les petits marqueurs de note/point utilisés sur les pages internals (documentation et internes de projet). Animation : le point pulse doucement — une boucle respirante d'échelle et de fade. Déclencheur : boucle en continu à l'écran. Technologie : un keyframe CSS (note-dot-pulse). Objectif : marquer l'élément comme annotation vivante sans exiger l'attention.",
    },
    'body-glow': {
      alt: 'Lueur ambiante de la page dérivant derrière le contenu',
      longdesc:
        "La lueur de fond ambiante derrière le contenu de la page. Animation : un grand dégradé radial doux dérive lentement à travers le document, changeant de position et d'intensité en une longue boucle. Déclencheur : tourne en continu sur chaque page. Technologie : un keyframe CSS (body-glow-drift) animant un calque de fond fixe — zéro JavaScript. Objectif : donner atmosphère et profondeur au thème sombre plutôt qu'un fond plat.",
    },
  },
  nl: {
    'progress-bar': {
      alt: 'Routevoortgangsbalk die tijdens navigatie over de bovenrand kruipt',
      longdesc:
        'De dunne voortgangsbalk vast aan de bovenrand van de viewport. Animatie: een scaleX-transform veegt de balk in enkele seconden van nul naar ongeveer zeventig procent terwijl een routewissel bezig is, daarna springt hij naar honderd procent en vervaagt ter plaatse zodra de doelview klaar is — hij trekt nooit zichtbaar terug. Trigger: start bij elke interne navigatie en eindigt wanneer de nieuwe view is gemonteerd. Technologie: CSS-transities op transform en opacity, gestuurd door twee toestandsklassen — geen JavaScript per frame. Doel: laat zien dat een pagina-overgang bezig is, in nprogress-stijl.',
    },
    'burger-button': {
      alt: 'Hamburgermenu-knop met vloeiende morph-animatie',
      longdesc:
        'De hamburgermenu-knop rechtsboven op elke pagina. Animatie: vloeiende morph tussen het drielijnspictogram en het sluit-kruis — de lijnen buigen en versmelten als vloeistof in plaats van stijf te roteren. Trigger: speelt bij klik/tikken als het menu opent en keert om bij sluiten; hover verandert de lijnspanning. Technologie: een door Rust/WASM gestuurd canvas-widget (WebGL-fragmentshader) met WebGPU/OffscreenCanvas-worker-variant en een pure CSS-lijnenfallback. Doel: communiceert de open/dicht-status van het menu via een tastbare, fysische overgang.',
    },
    'nav-menu-background': {
      alt: 'Geanimeerde fullscreen menu-achtergrond met stromend contourenveld',
      longdesc:
        'De fullscreen achtergrond achter het navigatiemenu-overlay. Animatie: een langzaam bewegend fractal contourenveld — lagen fbm-ruis drijven en hervormen continu, als hittehazen of plasma. Trigger: start als het hamburgermenu opent, stopt en wordt opgeruimd bij sluiten. Technologie: WebGL-fragmentshader (fbm in GLSL) op een eigen canvas, met WebGPU/OffscreenCanvas-worker-variant en statische CSS-gradiëntfallback. Doel: geeft het menu een levende, atmosferische diepte in plaats van een vlak kleurvlak.',
    },
    'nav-menu': {
      alt: 'Navigatiemenu-items met gespreide stijgende entree',
      longdesc:
        'Het navigatiemenu-overlay dat via de hamburgerknop opent. Animatie: elk item komt binnen met gespreide stijging en fade (nav-menu-item-in), glijdt enkele pixels omhoog terwijl het infadet; een membraan/plasma-gloed drijft in een trage loop over het paneel. Trigger: de entree speelt één keer per openen, van boven naar beneden gesequenced; de membraandrift loopt zolang het menu open is. Technologie: CSS-keyframes met per-item delays, nul JavaScript per frame. Doel: sequentieert de links zodat het oog ze op volgorde leest in plaats van één flits.',
    },
    'nav-flag': {
      alt: 'Taaldvlag-icoon met golf- en binnenkomst-animatie',
      longdesc:
        'Het kleine vlag-canvas naast het taallabel in de navigatiebalk. Animatie: de vlagdoek golft met een sinusvormige verplaatsing en het volledige glyf komt binnen met schaal (nav-flag-in) als de nav monteert of de taal wisselt. Technologie: een canvas-widget rendert de vlag procedureel (gesplitste landesvlaggen worden gecomponeerd); het CSS-keyframe regelt de entree. Doel: markeert de actieve taal met een vlag die als stof leest, niet als plat icoon.',
    },
    'switch-slider': {
      alt: 'Voorkeursschakelaar met vloeiende duimglijder',
      longdesc:
        'De aan/uit-schakelaars in het voorkeurendialoog (weergave, beweging, effecten). Animatie: de duim glijdt over de rail met vloeiende strekking — verlengt tijdens de rit en veert terug in rust, als een druppel. Trigger: speelt bij klik/tikken of schakelen via toetsenbord. Technologie: WebGL/canvas-widget (door Rust/WASM gestuurd) die rail en duim tekent, met CSS-fallback voor engines zonder WebGL. Doel: maakt de binaire staat voelbaar en bevestigt dat het schakelen landde.',
    },
    'theme-slider': {
      alt: 'Themaschakelaar met orbitale dag/nacht-glijder',
      longdesc:
        'De licht/donker-themaschakelaar in het voorkeurendialoog en de navigatie. Animatie: de duim reist als een hemellichaam — een dag/nacht-schijf kruist de rail terwijl zon/maan-glyfen erin crossfaden. Trigger: speelt bij schakelen; ook eenmalig bij laden als het opgeslagen thema afwijkt van de standaard. Technologie: WebGL/canvas-widget (door Rust/WASM gestuurd) met CSS-fallback. Doel: vertelt de themawissel als zonsopkomst/-ondergang in plaats van een binaire flip.',
    },
    'close-button': {
      alt: 'Sluitknop met vloeiende vulling en roterend kruis',
      longdesc:
        'De ronde sluitknop op modals en de uitgebreide media-lightbox. Animatie: bij hover stijgt een vloeiende vulling in de cirkel terwijl de kruislijnen roteren en aanspannen; bij druk klikt de vulling vast. Trigger: hover/focus armeert, druk ontslaat. Technologie: WebGL/canvas-widget (door Rust/WASM gestuurd) met een eenvoudige CSS-knop eronder voor engines zonder WebGL. Doel: geeft het sluiten een fysiek, bevredigend drukgevoel.',
    },
    skeleton: {
      alt: 'Laadskelet met morfende cellen en shimmer',
      longdesc:
        'De placeholder-skeletten die verschijnen waar content nog laadt (mediafiguren, tekstblokken, projecttegels). Animatie: glyfcellen morfen tussen 0/1-vormen terwijl een glansgradiënt van links naar rechts over het oppervlak trekt (skeleton-shimmer). Trigger: loopt continu terwijl de content laadt en levert dan het echte element. Technologie: canvas-widget (door Rust/WASM gestuurd celmorven) plus het CSS-shimmer-keyframe. Doel: signaleert "content komt eraan" met beweging die de layout vooruitloopt in plaats van een spinner.',
    },
    'intro-loader': {
      alt: 'Intro-loader met tegenroterende ringen en voortgang',
      longdesc:
        'De fullscreen boot-loader tijdens het laden van de eerste site-assets. Animatie: twee ringen draaien tegengesteld (intro-loader-spin-cw/ccw) rond een procentteller en gelokaliseerde faseberichten. Trigger: loopt vanaf het laden van de pagina tot de boot-bundle klaar is; dan fadet de hele loader weg en verwijdert zichzelf. Technologie: CSS-keyframes draaien de ringen; JS rapporteert alleen voortgang. Doel: houdt de eerste paint levend en leesbaar tijdens de tier/polyfill-bootsequentie.',
    },
    'site-toast': {
      alt: 'Notificatie-toast die uit de hoek schuift',
      longdesc:
        'De kleine notificatie-toast die in een schermhoek verschijnt voor gebeurtenissen zoals kopieerbevestigingen en cookie-acties. Animatie: schuift vanaf de rand binnen terwijl die omhoog fadet (site-toast-in), blijft staan en gaat terug schuivend met fade weg. Trigger: afgestuurd door app-events (kopiëren, opslagmelding, testnotificatie). Technologie: CSS-keyframes bij binnenkomst en een --closing-modifier bij uitgang. Doel: trekt het oog naar een tijdelijke boodschap zonder interactie te blokkeren.',
    },
    'mosaic-burn': {
      alt: 'Portfolio-tegeltitel die in gloed wegbrandt en zich heropbouwt',
      longdesc:
        'De titeltekst op de portfolio-tegels van de featured-work-wand. Animatie: bij hover verbranden de letters van de titel — geërodeerde randen, verschroeiingssporen en gloeiende emberdeeltjes consumeren de glyfen kolom voor kolom; daarna herbouwen de letters van onder naar boven door hetzelfde vuurveld als de pointer weggaat of de hover van doel wisselt. Trigger: pointer-hover op de tegel. Technologie: Rust/WASM-deeltjessimulatie (mosaic-burn-crate) die het erode/scorch/ember-model op canvas draait; een 2D-canvas-pad rendert hetzelfde veld als de GPU-route uitstaat — beide delen één deterministische simulatie. Doel: maakt van de simpele hover het kenmerkende vuureffect van de site.',
    },
    'mosaic-tile': {
      alt: 'Portfolio-tegel schuift op een veer naar nieuw slot + randschimmer',
      longdesc:
        'De projectkaarten in de featured-work-mozaïekwand. Animatie: als een kaart bij hover expandeert, schuiven verplaatste buren op een gedempte veer naar hun nieuwe slots — een organische overshoot-settle-curve (in CSS linear() gesynthetiseerde veer) in plaats van een lineaire glijder; een schimmer trekt periodiek over de rand van elke tegel. Trigger: de hover-repack animeert de verplaatste tegels; de randschimmer loopt zachtjes. Technologie: JS-masonry-pack + CSS-transition op transform; de schimmer is een canvas-ringpass. Doel: houdt de wand vloeibaar en levend terwijl die herschikt.',
    },
    'media-progressive': {
      alt: 'Mediabeeld morft van wazige lage naar scherpe hoge kwaliteit',
      longdesc:
        "Elke mediafiguur op de site (projectbeelden en -video's). Animatie: eerst tekent een lage-resolutie-placeholder, dan morft die naar het gedecodeerde hoge-resolutie-asset — de hoge-res laag lost op uit de wazige/ingezoomde thumb-staat in plaats van te knipperen, dus het oog leest een doorlopende scherpteword. Trigger: start als de figuur de viewport inscrollt (IntersectionObserver) en het asset in de WASM-pool decodeert. Technologie: WASM-beelddecode buiten de hoofdthread, blob-URL-wissel en CSS/canvas-morph. Doel: laat progressief laden aanvoelen als het beeld in focus komt, geen harde vervanging.",
    },
    'glitch-portrait': {
      alt: 'About-portret met VHS-glitch-corruptie-animatie',
      longdesc:
        'De portretafbeelding in de About-sectie. Animatie: periodieke VHS-achtige corruptie — scanline-rollen, kanaalsplitsing, blokverplaatsingen en ruusbanden vegen kort over de foto voordat die schoon terugspringt. Trigger: loopt op een willekeurige timer zolang de sectie in beeld is. Technologie: WebGL-fragmentshaderpass op de portret-textuur met canvas-fallback. Doel: geeft het portret een levende analoge-video-persoonlijkheid passend bij de technische esthetiek van de site.',
    },
    'divider-sheen': {
      alt: 'Footer-scheidingslijn met een reizende lichtschimmer',
      longdesc:
        'De haardunne scheidingslijnen tussen paginasecties en footerkolommen. Animatie: een zachte lichtband reist langzaam langs de lijn en veegt in een eindeloze loop van rand tot rand. Trigger: loopt continu zolang de scheider in beeld is. Technologie: canvas-widget die de lijn plus de bewegende gradiëntband tekent. Doel: tilt een statische lijn naar een subtiel, levend detail.',
    },
    'text-draw': {
      alt: 'Tekst tekent zichzelf letter voor letter als handschrift',
      longdesc:
        'Sectietitels, links en bijschriften met de draw-text-behandeling over de hele site. Animatie: elk teken wordt penstreekgewijs in leesvolgorde getekend — lijnen schrijven zich sequentieel als kalligrafie of plotter, met optionele woordgroepering. Trigger: speelt als het element de viewport inscrollt (IntersectionObserver, viewport-trigger) of bij expliciete dispatch. Technologie: geïnstantieerd per-teken-tekenen op canvas (Rust/WASM-text-draw-widget) met CSS-keyframe-fallback (char-draw/word-draw). Doel: laat koppen handgeschreven aanvoelen — voor je ogen geschreven in plaats van gestempeld.',
    },
    'ring-sheen': {
      alt: 'Tegelrand met schimmer die rond de ring reist',
      longdesc:
        'De randcontouren op mozaïek- en related-projecttegels. Animatie: een heldere schimmerband reist rond de tegelrand als licht dat over een lijst glijdt — in een trage, periodieke loop. Trigger: loopt zolang de tegel zichtbaar is; intensiveert bij hover. Technologie: canvas-ringpass bovenop de tegelrand. Doel: houdt statische kaartrasters levend met een goedkope omgevingsglans.',
    },
    'corner-brackets': {
      alt: 'Knop-hoekhaakjes expanderen bij hover',
      longdesc:
        "De hoekhaakjes-decoraties op actieknoppen (sluitbalken, CTA's). Animatie: de vier hoekhaakjes expanderen bij hover naar buiten en verhelderen, daarna trekken ze terug — als een camera-focusretikel dat vastklikt. Trigger: hover/focus op de knop. Technologie: klein canvas-widget per knop (geïnstantieerd haakjes-tekenen) met CSS-transition-fallback. Doel: communiceert interactiviteit met een precieze, instrumentele focus-cue.",
    },
    'scene-3d': {
      alt: 'Interactieve 3D-sterrenveld- en aardescène',
      longdesc:
        'De fullscreen 3D-scènes — het star-field-experiment (orbitende hemellichamen met dossierlabels) en de earth-playground (roterende planeet met baanbesturing). Animatie: doorlopende, fysisch geïnspireerde beweging — baanmechanica, rotatie, cameraparallax en overgangen tussen lichamen. Trigger: loopt zolang de scène in beeld is; pointer/touch orbiteert de camera. Technologie: three.js op WebGL/WebGPU met per-frame-werk op de GPU. Doel: het vlaggenschip real-time-3D-showcase van de site.',
    },
    'genie-modal': {
      alt: 'Uitgebreide media warpt vloeibaar de lightbox in',
      longdesc:
        'De uitgebreide media-lightbox die opent bij klik op een projectbeeld of -video. Animatie: de media warpt tussen de rechthoek van de aangeklikte figuur en de fullscreen modal-box als een vloeibaar blad — horizontale stroken lopen achter, buigen en strekken door een genie-veld terwijl dampdeeltjes van de bewegende vouw afspringen; hetzelfde veld klapt het bij sluiten terug. Trigger: klik/tikken om te openen, sluitknop of Escape om in te klappen. Technologie: WebGPU/Rust-mesh-warp + deeltjes-widget op een worker buiten de hoofdthread (indien actief), een allocatievrije 2D-canvas-strokenrenderer overal elders, en een CSS-zoom-keyframe als laatste redmiddel. Doel: vervangt een harde scale-fade door een fysieke overgang in macOS-dock-stijl.',
    },
    carousel: {
      alt: 'Awards-carrousel glijdt met momentum en voortgangsbalk',
      longdesc:
        'De horizontale awards-carrousel in de home-footer. Animatie: items glijden met momentum en snappen op positie; een voortgangsbalk vult langs de rail, een autoplay-streep animeert de timer en actieknoppen poppen binnen. Trigger: sleep-/scrollgebaren, vorige/volgende-knoppen en de autoplay-timer. Technologie: native scroll-snapping plus JS-veren en CSS-keyframes voor de chrome. Doel: laat het doorbladeren van de awards-strip aanvoelen als fysieke kaarten schuiven.',
    },
    'about-text': {
      alt: 'About-alinea onthult zijn tekens één voor één',
      longdesc:
        "De biografiealinea's in de About-sectie. Animatie: de tekst onthult teken voor teken in zinsvolgorde — elke letter fadet/beweegt op eigen timing, zodat de alinea zichzelf lijkt te schrijven. Trigger: speelt als de sectie de viewport inscrollt. Technologie: JS sequencet per-teken-spans met rAF-gedreven timing; CSS regelt de per-teken-transitie. Doel: geeft de bio een schrijfmachine-/spraakcadans passend bij de draw-text-titels.",
    },
    'related-tile': {
      alt: 'Related-projectkaart heft en zoomt bij hover',
      longdesc:
        "De related-projectkaarten onderaan de projectpagina's. Animatie: bij hover heft de kaart, zoomt de afbeelding zacht en schuiven titel/beschrijving omhoog — alles op gedempte-veer-easing (in CSS linear() gesynthetiseerde veren) zodat de beweging licht overschiet en organisch stabiliseert; een schimmer veegt over de kaartrand. Trigger: pointer-hover/focus. Technologie: CSS-transitions op transform/opacity gedreven door veerkrommes. Doel: maakt de navigatie-affordance fysiek en uitnodigend.",
    },
    'note-dot': {
      alt: 'Notitie-markering pulseert zacht',
      longdesc:
        "De kleine notitie-/stipmarkeringen op internals-pagina's (documentatie en projectinterna). Animatie: de stip pulseert zacht — een ademende schaal-en-fade-loop. Trigger: loopt continu in beeld. Technologie: een CSS-keyframe (note-dot-pulse). Doel: markeert het element als levende annotatie zonder aandacht te eisen.",
    },
    'body-glow': {
      alt: 'Omgevende paginagloed drijft traag achter de content',
      longdesc:
        'De omgevings-achtergrondgloed achter de pagina-inhoud. Animatie: een grote zachte radiale gradiënt drijft traag over het document en verschuift positie en intensiteit in een lange loop. Trigger: loopt continu op elke pagina. Technologie: een CSS-keyframe (body-glow-drift) animeert een vaste achtergrondlaag — nul JavaScript. Doel: geeft het donkere thema sfeer en diepte in plaats van een vlakke achtergrond.',
    },
  },
  ru: {
    'progress-bar': {
      alt: 'Индикатор загрузки маршрута, ползущий по верхнему краю во время навигации',
      longdesc:
        'Тонкая полоса прогресса, закреплённая у верхнего края области просмотра. Анимация: transform scaleX растягивает полосу от нуля примерно до семидесяти процентов за несколько секунд, пока идёт смена маршрута, затем она доходит до ста процентов и плавно гаснет на месте, когда целевой вид готов — она никогда заметно не откатывается назад. Триггер: запускается при каждой внутренней навигации и завершается после монтирования нового вида. Технология: CSS-переходы на transform и opacity, управляемые двумя классами состояния — без JavaScript на кадр. Назначение: сообщить, что идёт переход между страницами, в стиле nprogress.',
    },
    'burger-button': {
      alt: 'Кнопка меню-гамбургер с жидкой морф-анимацией',
      longdesc:
        'Кнопка меню-гамбургер в правом верхнем углу каждой страницы. Анимация: жидкий морф между значком из трёх линий и крестиком закрытия — штрихи изгибаются и сливаются как жидкость, а не жёстко вращаются. Триггер: срабатывает по клику/тапу при открытии меню и обратно при закрытии; ховер меняет натяжение штрихов. Технология: canvas-виджет на Rust/WASM (фрагментный шейдер WebGL) с вариантом на воркере WebGPU/OffscreenCanvas и чистым CSS-фолбэком линий. Назначение: передаёт состояние меню открыто/закрыто тактильным, физичным переходом.',
    },
    'nav-menu-background': {
      alt: 'Анимированный полноэкранный фон меню с текучим контурным полем',
      longdesc:
        'Полноэкранный фон за оверлеем навигационного меню. Анимация: медленно движущееся фрактальное контурное поле — слои fbm-шума дрейфуют и непрерывно перестраиваются, как марево или плазма. Триггер: запускается при открытии гамбургер-меню, останавливается и уничтожается при закрытии. Технология: фрагментный шейдер WebGL (fbm на GLSL) на отдельном канвасе, с вариантом WebGPU/OffscreenCanvas в воркере и статичным CSS-градиентом как фолбэк. Назначение: придаёт меню живую атмосферную глубину вместо плоской цветной панели.',
    },
    'nav-menu': {
      alt: 'Пункты навигационного меню с поэтапным подъёмом',
      longdesc:
        'Оверлей навигационного меню, открывающийся кнопкой-гамбургером. Анимация: каждый пункт входит со ступенчатым подъёмом и фейдом (nav-menu-item-in), сдвигаясь на несколько пикселей вверх и проявляясь; блик мембраны/плазмы медленно дрейфует по панели. Триггер: вход играет раз на открытие, сверху вниз; дрейф мембраны крутится, пока меню открыто. Технология: CSS-кейфреймы с задержками на пункт, ноль JavaScript на кадр. Назначение: выстраивает ссылки по очереди, чтобы глаз читал их по порядку, а не одной вспышкой.',
    },
    'nav-flag': {
      alt: 'Иконка флага языка с волной и анимацией появления',
      longdesc:
        'Небольшой канвас флага рядом с меткой языка в панели навигации. Анимация: полотнище флага волнуется синусоидальной рябью, а весь глиф появляется с масштабированием (nav-flag-in) при монтировании навигации или смене языка. Технология: canvas-виджет процедурно рисует флаг (составные флаги стран компонуются); CSS-кейфрейм отвечает за появление. Назначение: отмечает активный язык флагом, читающимся как ткань, а не плоская иконка.',
    },
    'switch-slider': {
      alt: 'Переключатель настроек с жидким скольжением бегунка',
      longdesc:
        'Переключатели вкл/выкл внутри диалога настроек (внешний вид, движение, эффекты). Анимация: бегунок скользит по рельсу с жидким растяжением — вытягивается в пути и щёлкает обратно в покое, как капля. Триггер: срабатывает по клику/тапу или переключению с клавиатуры. Технология: WebGL/canvas-виджет (на Rust/WASM), рисующий рельс и бегунок, с CSS-фолбэком для движков без WebGL. Назначение: делает бинарное состояние осязаемым и подтверждает переключение.',
    },
    'theme-slider': {
      alt: 'Переключатель темы с орбитальным скольжением день/ночь',
      longdesc:
        'Переключатель светлой/тёмной темы в диалоге настроек и навигации. Анимация: бегунок движется как небесное тело — диск день/ночь проходит по рельсу, а глифы солнца/луны внутри него crossfade-ятся. Триггер: срабатывает при переключении; также один раз при загрузке, если сохранённая тема отличается от стандартной. Технология: WebGL/canvas-виджет (на Rust/WASM) с CSS-фолбэком. Назначение: рассказывает смену темы как восход/закат вместо бинарного щелчка.',
    },
    'close-button': {
      alt: 'Кнопка закрытия с жидким заполнением и вращающимся крестом',
      longdesc:
        'Круглая кнопка закрытия на модалах и расширенной медиа-lightbox. Анимация: при ховере жидкое заполнение поднимается внутри круга, пока штрихи креста вращаются и натягиваются; при нажатии заполнение щёлкает. Триггер: ховер/фокус взводит, нажатие отпускает. Технология: WebGL/canvas-виджет (на Rust/WASM) с простой CSS-кнопкой под ним для движков без WebGL. Назначение: придаёт закрытию физическое, приятное ощущение нажатия.',
    },
    skeleton: {
      alt: 'Скелет загрузки с морфящимися ячейками и бликом',
      longdesc:
        'Плейсхолдер-скелеты, показываемые там, где контент ещё грузится (медиафигуры, текстовые блоки, плитки проектов). Анимация: ячейки глифов морфят между формами 0/1, пока градиентный блик бежит по поверхности слева направо (skeleton-shimmer). Триггер: крутится непрерывно, пока контент грузится, затем передаёт реальному элементу. Технология: canvas-виджет (морф ячеек на Rust/WASM) плюс CSS-кейфрейм шиммера. Назначение: сигнализирует «контент идёт» движением, предвосхищающим раскладку, вместо спиннера.',
    },
    'intro-loader': {
      alt: 'Вступительный загрузчик с встречно вращающимися кольцами и прогрессом',
      longdesc:
        'Полноэкранный загрузчик на старте, пока грузятся первые ассеты сайта. Анимация: два кольца вращаются в противоположные стороны (intro-loader-spin-cw/ccw) вокруг счётчика процентов и локализованных сообщений этапов. Триггер: крутится от загрузки страницы до готовности бут-бандла, затем загрузчик целиком затухает и удаляется. Технология: CSS-кейфреймы вращают кольца; JS лишь сообщает прогресс. Назначение: держит первый кадр живым и читаемым во время загрузки тиров/полифилов.',
    },
    'site-toast': {
      alt: 'Уведомление-тост, выскальзывающее из угла',
      longdesc:
        'Небольшой тост-уведомление, появляющийся в углу экрана для событий вроде подтверждений копирования и действий с cookies. Анимация: выскальзывает от края, проявляясь вверх (site-toast-in), держится, затем уходит обратным скольжением с затуханием. Триггер: вызывается событиями приложения (копирование, уведомление о хранилище, тест-уведомление). Технология: CSS-кейфреймы на входе и модификатор --closing на выходе. Назначение: привлекает взгляд к краткому сообщению, не блокируя взаимодействие.',
    },
    'mosaic-burn': {
      alt: 'Заголовок плитки портфолио сгорает в углях и собирается заново',
      longdesc:
        'Текст заголовка на плитках мозаики избранных работ. Анимация: при ховере буквы заголовка вспыхивают — эродированные края, следы обжига и светящиеся частицы углей пожирают глифы колонка за колонкой, затем буквы пересобираются снизу вверх тем же полем огня, когда указатель уходит или ховер меняет цель. Триггер: ховер указателя на плитке. Технология: симуляция частиц на Rust/WASM (крейт mosaic-burn) с моделью erode/scorch/ember на канвасе; 2D-canvas-путь рендерит то же поле при выключенном GPU-маршруте — оба делят одну детерминированную симуляцию. Назначение: превращает простой ховер в фирменный эффект огня сайта.',
    },
    'mosaic-tile': {
      alt: 'Плитка портфолио скользит на пружине в новый слот + блик по краю',
      longdesc:
        'Карточки проектов в мозаичной стене избранных работ. Анимация: когда карточка расширяется при ховере, смещённые соседи скользят в новые слоты на затухающей пружине — органическая кривая перелёта и установки (пружина, синтезированная в CSS linear()) вместо линейного скольжения; блик периодически пробегает по краю каждой плитки. Триггер: перепаковка по ховеру анимирует смещённые плитки; блик края мягко крутится. Технология: masonry-раскладка на JS + CSS-транзиция на transform; блик — кольцевой проход на канвасе. Назначение: держит стену текучей и живой во время перестройки.',
    },
    'media-progressive': {
      alt: 'Медиаизображение морфит из размытого низкого в чёткое высокое качество',
      longdesc:
        'Каждая медиафигура сайта (изображения и видео проектов). Анимация: сначала рисуется низкоразрешённый плейсхолдер, затем он морфит в декодированный высокоразрешённый ассет — слой высокого разрешения проявляется из размытого/зумированного состояния превью, а не вспыхивает, поэтому глаз читает непрерывное наведение резкости. Триггер: стартует, когда фигура входит во вьюпорт (IntersectionObserver) и ассет заканчивает декодирование в WASM-пуле. Технология: WASM-декодирование изображения вне главного потока, замена на blob-URL и морф на CSS/canvas. Назначение: делает прогрессивную загрузку похожей на фокусировку изображения, а не жёсткую замену.',
    },
    'glitch-portrait': {
      alt: 'Портрет About с анимацией VHS-глитч-искажений',
      longdesc:
        'Изображение портрета в секции About. Анимация: периодические VHS-искажения — роллы сканлайнов, расщепление каналов, сдвиги блоков и полосы шума кратко проносятся по фото, прежде чем оно снова станет чистым. Триггер: работает на случайном таймере, пока секция на экране. Технология: проход фрагментного шейдера WebGL по текстуре портрета с canvas-фолбэком. Назначение: придаёт портрету живую личность аналогового видео в духе технической эстетики сайта.',
    },
    'divider-sheen': {
      alt: 'Разделитель подвала с бегущим световым бликом',
      longdesc:
        'Тончайшие разделители между секциями страницы и колонками подвала. Анимация: мягкая полоса света медленно бежит вдоль линии, проносясь от края к краю в непрерывном цикле. Триггер: работает непрерывно, пока разделитель на экране. Технология: canvas-виджет, рисующий линию плюс движущуюся градиентную полосу. Назначение: превращает статичную линейку в тонкую живую деталь.',
    },
    'text-draw': {
      alt: 'Текст рисуется буква за буквой, как рукописный',
      longdesc:
        'Заголовки секций, ссылки и подписи с обработкой draw-text по всему сайту. Анимация: каждый символ рисуется перьевым штрихом в порядке чтения — штрихи пишутся последовательно, как каллиграфия или плоттер, с опциональной группировкой по словам. Триггер: срабатывает при входе элемента во вьюпорт (IntersectionObserver, viewport-триггер) или по явному dispatch. Технология: инстансированное посимвольное рисование на канвасе (виджет text-draw на Rust/WASM) с CSS-кейфрейм-фолбэком (char-draw/word-draw). Назначение: делает заголовки рукописными — написанными на глазах, а не отпечатанными.',
    },
    'ring-sheen': {
      alt: 'Край плитки с бликом, бегущим по кольцу',
      longdesc:
        'Контуры рамок на плитках мозаики и связанных проектов. Анимация: яркая полоса блика бежит по кольцу края плитки, как свет скользящий по рамке, — в медленном периодическом цикле. Триггер: крутится, пока плитка видна; усиливается при ховере. Технология: кольцевой проход на канвасе поверх края плитки. Назначение: оживляет статичные сетки карточек дешёвым окружающим блеском.',
    },
    'corner-brackets': {
      alt: 'Угловые скобки кнопки расширяются при ховере',
      longdesc:
        'Декорации угловых скобок на кнопках действий (панели закрытия, CTA). Анимация: четыре угловые скобки расширяются наружу и светлеют при ховере, затем сжимаются обратно — как фокусное перекрестье камеры, защёлкивающееся. Триггер: ховер/фокус на кнопке. Технология: маленький canvas-виджет на кнопку (инстансированное рисование скобок) с CSS-транзиция-фолбэком. Назначение: сообщает интерактивность точным, инструментальным сигналом фокуса.',
    },
    'scene-3d': {
      alt: 'Интерактивная 3D-сцена звёздного поля и земли',
      longdesc:
        'Полноэкранные 3D-сцены — эксперимент star-field (орбитальные небесные тела с досье-метками) и earth playground (вращающаяся планета с орбитальным управлением). Анимация: непрерывное физически вдохновлённое движение — орбитальная механика, вращение, параллакс камеры и переходы между телами. Триггер: работает всё время, пока сцена на экране; указатель/тач вращает камеру. Технология: three.js поверх WebGL/WebGPU с покадровой работой на GPU. Назначение: флагманская real-time-3D-витрина сайта.',
    },
    'genie-modal': {
      alt: 'Расширенная медиа жидко варпируется в lightbox',
      longdesc:
        'Расширенная медиа-lightbox, открывающаяся кликом по изображению или видео проекта. Анимация: медиа варпируется между прямоугольником кликнутой фигуры и полноэкранной рамкой модала как жидкий лист — горизонтальные полосы отстают, изгибаются и тянутся через гени-поле, пока частицы пара срываются с движущейся складки; то же поле сворачивает её обратно при закрытии. Триггер: клик/тап для открытия, кнопка закрытия или Escape для свёртки. Технология: WebGPU/Rust mesh-warp + частицы на воркере вне главного потока (когда включено), безаллокационный 2D-canvas-рендерер полос везде остальном и CSS-zoom-кейфрейм как последняя ступень. Назначение: заменяет жёсткий scale-fade физическим переходом в стиле dock macOS.',
    },
    carousel: {
      alt: 'Карусель наград скользит с импульсом и полосой прогресса',
      longdesc:
        'Горизонтальная карусель наград в подвале главной. Анимация: элементы скользят с импульсом и щёлкают на позицию; полоса прогресса заполняется вдоль рельса, штрих автопроигрывания анимирует таймер и кнопки действий появляются. Триггер: жесты перетаскивания/скролла, кнопки назад/вперёд и таймер автопроигрывания. Технология: нативный scroll-snapping плюс пружины на JS и CSS-кейфреймы для хрома. Назначение: делает пролистывание ленты наград похожим на тасовку физических карт.',
    },
    'about-text': {
      alt: 'Абзац About раскрывает свои символы один за другим',
      longdesc:
        'Абзацы биографии в секции About. Анимация: текст раскрывается символ за символом в порядке предложений — каждая буква появляется/движется в собственном темпе, поэтому абзац будто пишется сам. Триггер: срабатывает при входе секции во вьюпорт. Технология: JS последовательно запускает посимвольные спаны с rAF-таймингом; CSS управляет посимвольной транзицией. Назначение: придаёт биографии ритм печатной машинки/голоса в духе draw-text-заголовков.',
    },
    'related-tile': {
      alt: 'Карточка связанного проекта приподнимается и зумируется при ховере',
      longdesc:
        'Карточки связанных проектов внизу страниц проектов. Анимация: при ховере карточка приподнимается, её изображение мягко зумируется, а заголовок/описание подъезжают — всё на затухающем пружинном изинге (пружины, синтезированные в CSS linear()), чтобы движение слегка перелетало и органично устанавливалось; блик проносится по краю карточки. Триггер: ховер/фокус указателя. Технология: CSS-транзиции на transform/opacity, ведомые пружинными кривыми. Назначение: делает навигационный намёк физическим и приглашающим.',
    },
    'note-dot': {
      alt: 'Маркер заметки мягко пульсирует',
      longdesc:
        'Небольшие маркеры-заметки/точки на страницах internals (документация и внутренние страницы проектов). Анимация: точка мягко пульсирует — дышащий цикл масштаба и затухания. Триггер: крутится непрерывно на экране. Технология: один CSS-кейфрейм (note-dot-pulse). Назначение: помечает элемент как живая аннотация, не требуя внимания.',
    },
    'body-glow': {
      alt: 'Окружающее свечение страницы медленно дрейфует за контентом',
      longdesc:
        'Окружающее фоновое свечение за содержимым страницы. Анимация: большой мягкий радиальный градиент медленно дрейфует по документу, меняя позицию и интенсивность в длинном цикле. Триггер: работает непрерывно на каждой странице. Технология: один CSS-кейфрейм (body-glow-drift) анимирует фиксированный фоновый слой — ноль JavaScript. Назначение: придаёт тёмной теме атмосферу и глубину вместо плоского фона.',
    },
  },
  gl: {
    'progress-bar': {
      alt: 'Barra de progreso de ruta percorrendo o bordo superior durante a navegación',
      longdesc:
        'A barra fina de progreso fixa no bordo superior da viewport. Animación: un transform scaleX varre a barra de cero ata aproximadamente setenta por cento nalgúns segundos mentres o cambio de ruta está en marcha, despois completa ata cen por cento e esvaece no lugar cando a vista de destino resolve — nunca retrocede visiblemente. Disparador: arranca en cada navegación interna e remata cando a nova vista se monta. Tecnoloxía: transicións CSS en transform e opacity guiadas por dúas clases de estado — cero JavaScript por frame. Propósito: comunicar que unha transición de páxina está en curso, ao estilo nprogress.',
    },
    'burger-button': {
      alt: 'Botón do menú hamburguesa con animación de morph líquido',
      longdesc:
        'O botón do menú hamburguesa no canto superior dereito de cada páxina. Animación: morph líquido entre a icona de tres liñas e a X de peche — os trazos curvanse e fusiónanse como fluído en vez de xirar rigidamente. Disparador: tócase ao facer clic/tocar cando o menú abre e revértese cando pecha; o hover cambia a tensión dos trazos. Tecnoloxía: widget canvas dirixido por Rust/WASM (shader de fragmento WebGL), con variante en worker WebGPU/OffscreenCanvas e fallback CSS puro. Propósito: comunicar o estado aberto/pechado do menú cunha transición táctil e física.',
    },
    'nav-menu-background': {
      alt: 'Fondo animado a pantalla completa do menú con campo de contornos fluído',
      longdesc:
        'O fondo a pantalla completa pintado detrás do overlay do menú de navegación. Animación: un campo de contornos fractais en movemento lento — capas de ruído fbm derivan e remodelanse continuamente, como un espejismo de calor ou plasma. Disparador: arranca cando o menú hamburguesa abre, para e descártase cando pecha. Tecnoloxía: shader de fragmento WebGL (fbm en GLSL) nun canvas dedicado, con variante WebGPU/OffscreenCanvas en worker e fallback de gradiente CSS estático. Propósito: dar ao menú unha profundidade atmosférica viva no canto dun panel de cor chá.',
    },
    'nav-menu': {
      alt: 'Ítems do menú de navegación con entrada ascendente escalonada',
      longdesc:
        'O overlay do menú de navegación que abre polo botón hamburguesa. Animación: cada ítem entra con subida e fade escalonados (nav-menu-item-in), deslizándose uns píxeles cara arriba mentres aparece; un reflexo de membrana/plasma deriva polo panel en loop lento. Disparador: a entrada tócase unha vez por apertura, secuenciada de arriba abaixo; a deriva da membrana fai loop mentres o menú está aberto. Tecnoloxía: keyframes CSS con delays por ítem, cero JavaScript por frame. Propósito: secuenciar as ligazóns para que o ollo as lea en orde en vez dun flash único.',
    },
    'nav-flag': {
      alt: 'Icona de bandeira do idioma con animación de onda e entrada',
      longdesc:
        'O pequeno canvas de bandeira ao lado da etiqueta de idioma na barra de navegación. Animación: o tea da bandeira ondula cun ripple sinusoidal e o glifo enteiro entra con escala (nav-flag-in) cando a nav monta ou o idioma cambia. Tecnoloxía: widget canvas que renderiza a bandeira proceduralmente (as bandeiras de países divididos componse), co keyframe CSS a cargo da entrada. Propósito: marcar o idioma activo cunha bandeira que parece tea, non unha icona chá.',
    },
    'switch-slider': {
      alt: 'Interruptor de preferencia con deslizamento líquido do polgar',
      longdesc:
        'Os interruptores de aceso/apagado dentro do diálogo de preferencias (aparencia, movemento, efectos). Animación: o polgar deslízase polo rael con estiramento líquido — allóngase durante o traxecto e volta ao repouso, como unha pinga. Disparador: tócase ao facer clic/tocar ou alternar polo teclado. Tecnoloxía: widget WebGL/canvas (dirixido por Rust/WASM) pintando rael e polgar, con fallback CSS para motores sen WebGL. Propósito: dar tacto ao estado binario e confirmar que a alternancia pasou.',
    },
    'theme-slider': {
      alt: 'Alternador de tema con deslizamento orbital día/noite',
      longdesc:
        'O interruptor de tema claro/escuro no diálogo de preferencias e na navegación. Animación: o polgar viaxa como un corpo orbital — un disco día/noite atravesa o rael mentres glifos de sol/lúa fan crossfade dentro del. Disparador: tócase ao alternar; tamén unha vez ao cargar cando o tema gardado difire do predeterminado. Tecnoloxía: widget WebGL/canvas (dirixido por Rust/WASM) con fallback CSS. Propósito: narrar o cambio de tema como un amencer/solpor en vez dun flip binario.',
    },
    'close-button': {
      alt: 'Botón de pechar con recheo líquido e X xiratoria',
      longdesc:
        'O botón circular de pechar dos modais e do lightbox de medios expandido. Animación: en hover un recheo líquido sobe dentro do círculo mentres os trazos da X rotan e se tensan; ao premer, o recheo traba. Disparador: hover/foco o arma, premer o libera. Tecnoloxía: widget WebGL/canvas (dirixido por Rust/WASM) cun botón CSS sinxelo debaixo para motores sen WebGL. Propósito: dar ao peche unha sensación física e satisfactoria de presión.',
    },
    skeleton: {
      alt: 'Esqueleto de carga con celas en morph e brillo',
      longdesc:
        'Os esqueletos de placeholder amosados onde o contido aínda carga (figuras de medios, bloques de texto, tiles de proxecto). Animación: celas de glifo fan morph entre formas 0/1 mentres un brillo en gradiente atravesa a superficie de esquerda a dereita (skeleton-shimmer). Disparador: corre continuamente mentres o contido carga, despois entrega ao elemento real. Tecnoloxía: widget canvas (morph de celas dirixido por Rust/WASM) máis o keyframe CSS do shimmer. Propósito: sinalar "o contido chega" con movemento que anticipa o layout en vez dun spinner.',
    },
    'intro-loader': {
      alt: 'Loader de introdución con aneis contrarrotativos e progreso',
      longdesc:
        'O loader de arranque a pantalla completa amosado mentres cargan os primeiros assets do sitio. Animación: dous aneis xiran en direccións opostas (intro-loader-spin-cw/ccw) ao redor dun contador de porcentaxe e mensaxes de etapa localizadas. Disparador: corre dende a carga da páxina ata que o bundle de arranque está listo, cando o loader enteiro esvaece e se retira. Tecnoloxía: keyframes CSS xirando os aneis; o JS só reporta progreso. Propósito: manter o primeiro paint vivo e lexible durante a secuencia de arranque de tiers/polyfills.',
    },
    'site-toast': {
      alt: 'Toast de notificación deslizándose desde o canto',
      longdesc:
        'O pequeno toast de notificación que aparece nun canto da pantalla para eventos como confirmacións de copia e accións de cookies. Animación: deslízase desde o bordo mentres sobe con fade (site-toast-in), aguanta e sae deslizándose de volta con fade. Disparador: disparado por eventos da app (copia, aviso de almacenamento, notificación de proba). Tecnoloxía: keyframes CSS na entrada e un modificador --closing na saída. Propósito: atraer a vista a unha mensaxe transitoria sen bloquear a interacción.',
    },
    'mosaic-burn': {
      alt: 'Título do tile de portafolio queimándose en brasa e rearmándose',
      longdesc:
        'O texto do título nos tiles do mosaico de traballos destacados. Animación: en hover as letras do título entran en combustión — bordes erosionados, pegadas de queimado e partículas de brasa incandescente consomen os glifos columna por columna, e as letras reconstrúense de abaixo arriba polo mesmo campo de lume cando o punteiro sae ou o hover cambia de obxectivo. Disparador: hover do punteiro no tile. Tecnoloxía: simulación de partículas en Rust/WASM (crate mosaic-burn) correndo o modelo erode/scorch/ember nun canvas; un camiño 2D-canvas renderiza o mesmo campo cando a ruta GPU está apagada — os dous comparten unha simulación determinística. Propósito: converter o hover simple no efecto de lume insignia do sitio.',
    },
    'mosaic-tile': {
      alt: 'Tile de portafolio deslizándose a novo slot con resorte + brillo no bordo',
      longdesc:
        'As tarxetas de proxecto no mosaico de traballos destacados. Animación: cando unha tarxeta se expande en hover, os veciños desprazados deslízanse aos seus novos slots cun resorte amortecido — unha curva orgánica de overshoot e asentamento (resorte sintetizado en CSS linear()) en vez dun deslizamento lineal; un brillo percorre periodicamente o bordo de cada tile. Disparador: o repack por hover anima os tiles desprazados; o brillo do bordo fai loop suave. Tecnoloxía: pack masonry en JS + transición CSS en transform; o brillo é unha pasada de anel en canvas. Propósito: manter a parede líquida e viva mentres se reordena.',
    },
    'media-progressive': {
      alt: 'Imaxe de medios pasando de borrosa en baixa calidade a nítida en alta',
      longdesc:
        'Cada figura de medios do sitio (imaxes e vídeos dos proxectos). Animación: un placeholder de baixa resolución pinta primeiro, despois fai morph ao asset de alta resolución decodificado — a capa de alta resólvese dende o estado borroso/ampliado do thumb en vez de piscar, así o ollo le unha nitidez continua. Disparador: arranca cando a figura entra na viewport (IntersectionObserver) e o asset remata o decode no pool WASM. Tecnoloxía: decode de imaxe WASM fóra do fío principal, cambio a blob-URL e morph en CSS/canvas. Propósito: facer que a carga progresiva pareza a imaxe entrando en foco, non unha substitución dura.',
    },
    'glitch-portrait': {
      alt: 'Retrato do About con animación de corrupción glitch VHS',
      longdesc:
        'A imaxe do retrato na sección About. Animación: corrupción periódica estilo VHS — rolos de scanline, separación de canles, desprazamento de bloques e bandas de ruído barren a foto brevemente antes de que volva limpa. Disparador: corre nun timer aleatorio mentres a sección está en pantalla. Tecnoloxía: pasada de shader de fragmento WebGL na textura do retrato con fallback canvas. Propósito: dar ao retrato unha personalidade viva de vídeo analóxico, acorde á estética técnica do sitio.',
    },
    'divider-sheen': {
      alt: 'Divisor do pé cun brillo de luz viaxeiro',
      longdesc:
        'Os divisores hairline que separan seccións de páxina e columnas do pé. Animación: unha banda suave de luz viaxa lentamente polo fío, varrendo de punta a punta en loop continuo. Disparador: corre continuamente mentres o divisor está en pantalla. Tecnoloxía: widget canvas pintando a liña máis a banda de gradiente en movemento. Propósito: elevar unha regra estática a un detalle sutil e vivo.',
    },
    'text-draw': {
      alt: 'Texto debuxándose letra a letra como manuscrito',
      longdesc:
        'Títulos de sección, ligazóns e lendas co tratamento draw-text en todo o sitio. Animación: cada carácter debúxase estilo trazo de pluma en orde de lectura — os trazos escríbense secuencialmente como caligrafía ou plotter, con agrupación opcional por palabra. Disparador: tócase cando o elemento entra na viewport (IntersectionObserver, disparador viewport) ou por dispatch explícito. Tecnoloxía: debuxo instanciado por carácter en canvas (widget text-draw en Rust/WASM) con fallback en keyframe CSS (char-draw/word-draw). Propósito: facer que os títulos parezan autografados — escritos diante de ti en vez de estampados.',
    },
    'ring-sheen': {
      alt: 'Bordo de tile con brillo viaxando polo anel',
      longdesc:
        'Os contornos de bordo nos tiles do mosaico e de proxectos relacionados. Animación: unha banda de brillo viaxa polo anel do bordo do tile como luz deslizándose nun marco, en loop periódico lento. Disparador: fai loop mentres o tile está visible; intensifícase en hover. Tecnoloxía: pasada de anel en canvas composta sobre o bordo do tile. Propósito: manter vivas as grellas de tarxetas estáticas cun reflexo ambiental barato.',
    },
    'corner-brackets': {
      alt: 'Esquinas de botón expandíndose en corchetes en hover',
      longdesc:
        'As decoracións de corchetes de esquina nos botóns de acción (barras de pechar, CTAs). Animación: os catro corchetes de esquina expándense cara fóra e acláranse en hover, despois contráense de volta — como un retículo de enfoque de cámara trabándose. Disparador: hover/foco no botón. Tecnoloxía: pequeno widget canvas por botón (debuxo instanciado de corchetes) con fallback en transición CSS. Propósito: comunicar interactividade cunha pista de enfoque precisa e instrumental.',
    },
    'scene-3d': {
      alt: 'Escena 3D interactiva de campo estelar e terra',
      longdesc:
        'As escenas 3D a pantalla completa — o experimento star-field (corpos celestes en órbita con etiquetas de dossiê) e o playground da terra (planeta xirando con controis de órbita). Animación: movemento continuo inspirado en física — mecánica orbital, rotación, paralaxe no movemento de cámara e transicións entre corpos. Disparador: corre todo o tempo que a escena está en pantalla; punteiro/toque orbita a cámara. Tecnoloxía: three.js sobre WebGL/WebGPU co traballo por frame na GPU. Propósito: a vitrina 3D en tempo real insignia do sitio.',
    },
    'genie-modal': {
      alt: 'Medio expandido abríndose en warp líquido cara ao lightbox',
      longdesc:
        'O lightbox de medios expandidos que abre ao facer clic nunha imaxe ou vídeo de proxecto. Animación: o medio deformase entre o rectángulo da figura clicada e a caixa do modal a pantalla completa como unha folla líquida — bandas horizontais atrasan, curvanse e estiran por un campo genie mentres partículas de vapor se desprenden do prego en movemento; o mesmo campo o colapsa de volta ao pechar. Disparador: clic/toque para abrir, botón de pechar ou Escape para colapsar. Tecnoloxía: widget WebGPU/Rust de mesh-warp + partículas nun worker fóra do fío principal cando está habilitado, un renderer 2D-canvas de bandas sen alocación por frame en todo o demais, e un keyframe CSS de zoom como último recurso. Propósito: substituír un scale-fade duro por unha transición física estilo dock de macOS.',
    },
    carousel: {
      alt: 'Carrusel de premios deslizando con momentum e barra de progreso',
      longdesc:
        'O carrusel horizontal de premios no pé da home. Animación: os ítems deslízanse con momentum e fan snap na posición; unha barra de progreso enche ao longo do rael, un trazo de autoplay anima o temporizador e os controis de acción aparecen. Disparador: xestos de arrastre/scroll, controis anterior/seguinte e o timer de autoplay. Tecnoloxía: scroll snapping nativo máis springs en JS e keyframes CSS para o chrome. Propósito: facer que follar a tira de premios pareza barallar cartas físicas.',
    },
    'about-text': {
      alt: 'Parágrafo do About revelando os seus caracteres un a un',
      longdesc:
        'Os parágrafos de biografía na sección About. Animación: o texto revélase carácter a carácter na orde das frases — cada letra esvaece/móvese no seu propio tempo, así o parágrafo parece escribirse só. Disparador: tócase cando a sección entra na viewport. Tecnoloxía: JS secuencia spans por carácter con timing dirixido por rAF; o CSS coida da transición por carácter. Propósito: dar á bio unha cadencia de máquina de escribir/voz acorde aos títulos draw-text.',
    },
    'related-tile': {
      alt: 'Tarxeta de proxecto relacionado elevándose e facendo zoom en hover',
      longdesc:
        'As tarxetas de proxectos relacionados ao final das páxinas de proxecto. Animación: en hover a tarxeta elévase, a imaxe fai un zoom suave e título/descrición sobem — todo con easing de resorte amortecido (springs sintetizados en CSS linear()) para que o movemento pase lixeiramente e se asente de forma orgánica; un brillo varre o bordo da tarxeta. Disparador: hover/foco do punteiro. Tecnoloxía: transicións CSS en transform/opacity dirixidas por curvas de resorte. Propósito: facer que a affordance de navegación se sinta física e convidante.',
    },
    'note-dot': {
      alt: 'Marcador de nota pulsando suavemente',
      longdesc:
        'Os pequenos marcadores de nota/punto usados nas páxinas de internals (documentación e internas de proxecto). Animación: o punto pulsa suavemente — un loop respirante de escala e fade. Disparador: fai loop continuamente en pantalla. Tecnoloxía: un keyframe CSS (note-dot-pulse). Propósito: marcar o elemento como anotación viva sen esixir atención.',
    },
    'body-glow': {
      alt: 'Brillo ambiente da páxina derivando detrás do contido',
      longdesc:
        'O brillo de fondo ambiente detrás do contido da páxina. Animación: un gran gradiente radial suave deriva lentamente polo documento, cambiando posición e intensidade nun loop longo. Disparador: corre continuamente en todas as páxinas. Tecnoloxía: un keyframe CSS (body-glow-drift) animando unha capa de fondo fixa — cero JavaScript. Propósito: dar atmosfera e profundidade ao tema escuro no canto dun fondo chá.',
    },
  },
  ca: {
    'progress-bar': {
      alt: 'Barra de progrés de ruta que recorre la vora superior durant la navegació',
      longdesc:
        "La barra fina de progrés fixada a la vora superior del viewport. Animació: un transform scaleX recorre la barra de zero fins aproximadament setanta per cent en uns segons mentre el canvi de ruta és en curs, després completa fins a cent per cent i s'esvaeix al lloc quan la vista de destí resol — mai no retrocedeix visiblement. Disparador: arrenca a cada navegació interna i acaba quan la nova vista es munta. Tecnologia: transicions CSS en transform i opacity dirigides per dues classes d'estat — zero JavaScript per frame. Propòsit: comunicar que una transició de pàgina és en curs, a l'estil nprogress.",
    },
    'burger-button': {
      alt: 'Botó del menú hamburguesa amb animació de morph líquid',
      longdesc:
        "El botó del menú hamburguesa a la cantonada superior dreta de cada pàgina. Animació: morph líquid entre la icona de tres línies i la X de tancament — els traços es corben i es fonen com a fluid en lloc de girar rígidament. Disparador: es reprodueix en fer clic/tocar quan el menú obre i es reverteix quan tanca; el hover canvia la tensió dels traços. Tecnologia: widget canvas dirigit per Rust/WASM (shader de fragment WebGL), amb variant en worker WebGPU/OffscreenCanvas i fallback CSS pur. Propòsit: comunicar l'estat obert/tancat del menú amb una transició tàctil i física.",
    },
    'nav-menu-background': {
      alt: 'Fons animat a pantalla completa del menú amb camp de contorns fluid',
      longdesc:
        "El fons a pantalla completa pintat darrere de l'overlay del menú de navegació. Animació: un camp de contorns fractals en moviment lent — capes de soroll fbm deriven i es remodelen contínuament, com un miratge de calor o plasma. Disparador: arrenca quan el menú hamburguesa obre, s'atura i es descarta quan tanca. Tecnologia: shader de fragment WebGL (fbm en GLSL) en un canvas dedicat, amb variant WebGPU/OffscreenCanvas en worker i fallback de degradat CSS estàtic. Propòsit: donar al menú una profunditat atmosfèrica viva en lloc d'un panell de color pla.",
    },
    'nav-menu': {
      alt: 'Ítems del menú de navegació amb entrada ascendent esglaonada',
      longdesc:
        "L'overlay del menú de navegació que obre pel botó hamburguesa. Animació: cada ítem entra amb pujada i fade esglaonats (nav-menu-item-in), lliscant uns píxels cap amunt mentre apareix; un reflex de membrana/plasma deriva pel panell en loop lent. Disparador: l'entrada es reprodueix una vegada per obertura, seqüenciada de dalt a baix; la deriva de la membrana fa loop mentre el menú està obert. Tecnologia: keyframes CSS amb delays per ítem, zero JavaScript per frame. Propòsit: seqüenciar els enllaços perquè l'ull els llegeixi en ordre en lloc d'un flash únic.",
    },
    'nav-flag': {
      alt: "Icona de bandera de l'idioma amb animació d'ona i entrada",
      longdesc:
        "El petit canvas de bandera al costat de l'etiqueta d'idioma a la barra de navegació. Animació: la tela de la bandera ondula amb un ripple sinusoidal i el glif sencer entra amb escala (nav-flag-in) quan la nav munta o l'idioma canvia. Tecnologia: widget canvas que renderitza la bandera proceduralment (les banderes de països dividits es componen), amb el keyframe CSS encarregat de l'entrada. Propòsit: marcar l'idioma actiu amb una bandera que sembla tela, no una icona plana.",
    },
    'switch-slider': {
      alt: 'Interruptor de preferència amb lliscament líquid del polze',
      longdesc:
        "Els interruptors d'ences/apagat dins el diàleg de preferències (aparença, moviment, efectes). Animació: el polze es llisca pel rail amb estirament líquid — s'allarga durant el trajecte i torna al repòs, com una gota. Disparador: es reprodueix en fer clic/tocar o alternar per teclat. Tecnologia: widget WebGL/canvas (dirigit per Rust/WASM) pintant rail i polze, amb fallback CSS per motors sense WebGL. Propòsit: donar tacte a l'estat binari i confirmar que l'alternança ha passat.",
    },
    'theme-slider': {
      alt: 'Alternador de tema amb lliscament orbital dia/nit',
      longdesc:
        "L'interruptor de tema clar/fosc al diàleg de preferències i la navegació. Animació: el polze viatja com un cos orbital — un disc dia/nit travessa el rail mentre glifs de sol/lluna fan crossfade dins seu. Disparador: es reprodueix en alternar; també una vegada en carregar quan el tema desat difereix del predeterminat. Tecnologia: widget WebGL/canvas (dirigit per Rust/WASM) amb fallback CSS. Propòsit: narrar el canvi de tema com una albada/capvespre en lloc d'un flip binari.",
    },
    'close-button': {
      alt: 'Botó de tancar amb ompliment líquid i X giratòria',
      longdesc:
        "El botó circular de tancar dels modals i del lightbox de mitjans expandit. Animació: en hover un ompliment líquid puja dins el cercle mentre els traços de la X giren i es tensen; en prémer, l'ompliment s'encalla. Disparador: hover/focus l'arma, prémer l'allibera. Tecnologia: widget WebGL/canvas (dirigit per Rust/WASM) amb un botó CSS senzill a sota per motors sense WebGL. Propòsit: donar al tancament una sensació física i satisfactòria de pressió.",
    },
    skeleton: {
      alt: 'Esquelet de càrrega amb cel·les en morph i brillantor',
      longdesc:
        "Els esquelets de placeholder mostrats on el contingut encara carrega (figures de mitjans, blocs de text, tiles de projecte). Animació: cel·les de glif fan morph entre formes 0/1 mentre una brillantor en degradat travessa la superfície d'esquerra a dreta (skeleton-shimmer). Disparador: corre contínuament mentre el contingut carrega, després lliura a l'element real. Tecnologia: widget canvas (morph de cel·les dirigit per Rust/WASM) més el keyframe CSS del shimmer. Propòsit: senyalar \"el contingut arriba\" amb moviment que anticipa el layout en lloc d'un spinner.",
    },
    'intro-loader': {
      alt: "Loader d'introducció amb anells contrarrotatius i progrés",
      longdesc:
        "El loader d'arrencada a pantalla completa mostrat mentre carreguen els primers assets del lloc. Animació: dos anells giren en direccions oposades (intro-loader-spin-cw/ccw) al voltant d'un comptador de percentatge i missatges d'etapa localitzats. Disparador: corre des de la càrrega de la pàgina fins que el bundle d'arrencada està llest, quan el loader sencer s'esvaeix i es retira. Tecnologia: keyframes CSS girant els anells; el JS només reporta progrés. Propòsit: mantenir el primer paint viu i llegible durant la seqüència d'arrencada de tiers/polyfills.",
    },
    'site-toast': {
      alt: 'Toast de notificació lliscant des de la cantonada',
      longdesc:
        "El petit toast de notificació que apareix en una cantonada de la pantalla per esdeveniments com confirmacions de còpia i accions de cookies. Animació: es llisca des de la vora mentre puja amb fade (site-toast-in), aguanta i surt lliscant-se de tornada amb fade. Disparador: disparat per esdeveniments de l'app (còpia, avís d'emmagatzematge, notificació de prova). Tecnologia: keyframes CSS a l'entrada i un modificador --closing a la sortida. Propòsit: atreure la vista a un missatge transitori sense blocar la interacció.",
    },
    'mosaic-burn': {
      alt: 'Títol del tile de portafoli cremant-se en brases i rearmant-se',
      longdesc:
        "El text del títol als tiles del mosaic de treballs destacats. Animació: en hover les lletres del títol entren en combustió — vores erosionades, estelades de cremada i partícules de brasa incandescent consumeixen els glifs columna per columna, i les lletres es reconstrueixen de baix a dalt pel mateix camp de foc quan el punter surt o el hover canvia d'objectiu. Disparador: hover del punter al tile. Tecnologia: simulació de partícules en Rust/WASM (crate mosaic-burn) corrent el model erode/scorch/ember en un canvas; un camí 2D-canvas renderitza el mateix camp quan la ruta GPU està apagada — tots dos comparteixen una simulació determinística. Propòsit: convertir el hover simple en l'efecte de foc insígnia del lloc.",
    },
    'mosaic-tile': {
      alt: 'Tile de portafoli lliscant a nou slot amb ressort + brillantor a la vora',
      longdesc:
        "Les targetes de projecte al mosaic de treballs destacats. Animació: quan una targeta s'expandeix en hover, els veins desplaçats es llisquen als seus nous slots amb un ressort amortit — una corba orgànica d'overshoot i assentament (ressort sintetitzat en CSS linear()) en lloc d'un lliscament lineal; una brillantor recorre periòdicament la vora de cada tile. Disparador: el repack per hover anima els tiles desplaçats; la brillantor de la vora fa loop suaument. Tecnologia: pack masonry en JS + transició CSS en transform; la brillantor és una passada d'anell en canvas. Propòsit: mantenir la paret líquida i viva mentre es reordena.",
    },
    'media-progressive': {
      alt: 'Imatge de mitjans passant de borrosa en baixa qualitat a nítida en alta',
      longdesc:
        "Cada figura de mitjans del lloc (imatges i vídeos dels projectes). Animació: un placeholder de baixa resolució pinta primer, després fa morph a l'asset d'alta resolució decodificat — la capa d'alta es resol des de l'estat borrós/ampliat del thumb en lloc de pampalluguejar, així l'ull llegeix una nitidesa contínua. Disparador: arrenca quan la figura entra a la viewport (IntersectionObserver) i l'asset acaba el decode al pool WASM. Tecnologia: decode d'imatge WASM fora del fil principal, canvi a blob-URL i morph en CSS/canvas. Propòsit: fer que la càrrega progressiva sembli la imatge entrant a focus, no una substitució dura.",
    },
    'glitch-portrait': {
      alt: "Retrat de l'About amb animació de corrupció glitch VHS",
      longdesc:
        "La imatge del retrat a la secció About. Animació: corrupció periòdica estil VHS — rotllos de scanline, separació de canals, desplaçament de blocs i bandes de soroll escombren la foto breument abans que torni neta. Disparador: corre en un timer aleatori mentre la secció està en pantalla. Tecnologia: passada de shader de fragment WebGL en la textura del retrat amb fallback canvas. Propòsit: donar al retrat una personalitat viva de vídeo analògic, d'acord amb l'estètica tècnica del lloc.",
    },
    'divider-sheen': {
      alt: 'Divisor del peu amb una brillantor de llum viatgera',
      longdesc:
        'Els divisors hairline que separen seccions de pàgina i columnes del peu. Animació: una banda suau de llum viatja lentament pel fil, escombrant de punta a punta en loop continu. Disparador: corre contínuament mentre el divisor està en pantalla. Tecnologia: widget canvas pintant la línia més la banda de degradat en moviment. Propòsit: elevar una regla estàtica a un detall subtil i viu.',
    },
    'text-draw': {
      alt: 'Text dibuixant-se lletra a lletra com a manuscrit',
      longdesc:
        "Títols de secció, enllaços i llegendes amb el tractament draw-text a tot el lloc. Animació: cada caràcter es dibuixa estil traç de ploma en ordre de lectura — els traços s'escriuen seqüencialment com cal·ligrafia o plotter, amb agrupació opcional per paraula. Disparador: es reprodueix quan l'element entra a la viewport (IntersectionObserver, disparador viewport) o per dispatch explícit. Tecnologia: dibuix instanciat per caràcter en canvas (widget text-draw en Rust/WASM) amb fallback en keyframe CSS (char-draw/word-draw). Propòsit: fer que els títols semblin autografiats — escrits davant teu en lloc d'estampats.",
    },
    'ring-sheen': {
      alt: "Vora de tile amb brillantor viatjant per l'anell",
      longdesc:
        "Els contorns de vora als tiles del mosaic i de projectes relacionats. Animació: una banda de brillantor viatja per l'anell de la vora del tile com llum lliscant en un marc, en loop periòdic lent. Disparador: fa loop mentre el tile està visible; s'intensifica en hover. Tecnologia: passada d'anell en canvas composta sobre la vora del tile. Propòsit: mantenir vives les graelles de targetes estàtiques amb un reflex ambiental barat.",
    },
    'corner-brackets': {
      alt: 'Cantonades de botó expandint-se en claudàtors en hover',
      longdesc:
        "Les decoracions de claudàtors de cantonada als botons d'acció (barres de tancar, CTAs). Animació: els quatre claudàtors de cantonada s'expandeixen cap enfora i s'aclareixen en hover, després es contreuen de tornada — com un reticle d'enfocament de càmera encallant-se. Disparador: hover/focus al botó. Tecnologia: petit widget canvas per botó (dibuix instanciat de claudàtors) amb fallback en transició CSS. Propòsit: comunicar interactivitat amb una pista d'enfocament precisa i instrumental.",
    },
    'scene-3d': {
      alt: 'Escena 3D interactiva de camp estel·lar i terra',
      longdesc:
        "Les escenes 3D a pantalla completa — l'experiment star-field (cossos celestes en òrbita amb etiquetes de dossier) i el playground de la terra (planeta girant amb controls d'òrbita). Animació: moviment continu inspirat en física — mecànica orbital, rotació, paral·laxi al moviment de càmera i transicions entre cossos. Disparador: corre tot el temps que l'escena està en pantalla; punter/tou orbita la càmera. Tecnologia: three.js sobre WebGL/WebGPU amb el treball per frame a la GPU. Propòsit: la vitrina 3D en temps real insígnia del lloc.",
    },
    'genie-modal': {
      alt: 'Mitjà expandit obrint-se en warp líquid cap al lightbox',
      longdesc:
        "El lightbox de mitjans expandits que obre en fer clic en una imatge o vídeo de projecte. Animació: el mitjà es deforma entre el rectangle de la figura clicada i la caixa del modal a pantalla completa com una làmina líquida — bandes horitzontals s'endarrereixen, es corben i s'estiren per un camp genie mentre partícules de vapor es desprenen del plec en moviment; el mateix camp el col·lapsa de tornada en tancar. Disparador: clic/tocar per obrir, botó de tancar o Escape per col·lapsar. Tecnologia: widget WebGPU/Rust de mesh-warp + partícules en un worker fora del fil principal quan està habilitat, un renderer 2D-canvas de bandes sense al·locació per frame a tota la resta, i un keyframe CSS de zoom com a últim recurs. Propòsit: substituir un scale-fade dur per una transició física estil dock de macOS.",
    },
    carousel: {
      alt: 'Carrusel de premis lliscant amb momentum i barra de progrés',
      longdesc:
        "El carrusel horitzontal de premis al peu de la home. Animació: els ítems es llisquen amb momentum i fan snap a la posició; una barra de progrés s'omple al llarg del rail, un traç d'autoplay anima el temporitzador i els controls d'acció apareixen. Disparador: gestos d'arrossegament/scroll, controls anterior/següent i el timer d'autoplay. Tecnologia: scroll snapping nadiu més springs en JS i keyframes CSS per al chrome. Propòsit: fer que fullejar la tira de premis sembli barrejar cartes físiques.",
    },
    'about-text': {
      alt: "Paràgraf de l'About revelant els seus caràcters u a u",
      longdesc:
        "Els paràgrafs de biografia a la secció About. Animació: el text es revela caràcter a caràcter en l'ordre de les frases — cada lletra s'esvaeix/es mou en el seu propi temps, així el paràgraf sembla escriure's sol. Disparador: es reprodueix quan la secció entra a la viewport. Tecnologia: JS seqüència spans per caràcter amb timing dirigit per rAF; el CSS cuida de la transició per caràcter. Propòsit: donar a la bio una cadència de màquina d'escriure/veu d'acord amb els títols draw-text.",
    },
    'related-tile': {
      alt: 'Targeta de projecte relacionat elevant-se i fent zoom en hover',
      longdesc:
        "Les targetes de projectes relacionats al final de les pàgines de projecte. Animació: en hover la targeta s'eleva, la imatge fa un zoom suaument i títol/descripció pugen — tot amb easing de ressort amortit (springs sintetitzats en CSS linear()) perquè el moviment passi lleugerament i s'assenti de forma orgànica; una brillantor escombra la vora de la targeta. Disparador: hover/focus del punter. Tecnologia: transicions CSS en transform/opacity dirigides per corbes de ressort. Propòsit: fer que l'affordance de navegació se senti física i convidant.",
    },
    'note-dot': {
      alt: 'Marcador de nota pulsant suaument',
      longdesc:
        "Els petits marcadors de nota/punt usats a les pàgines d'internals (documentació i internes de projecte). Animació: el punt pulsa suaument — un loop respirant d'escala i fade. Disparador: fa loop contínuament en pantalla. Tecnologia: un keyframe CSS (note-dot-pulse). Propòsit: marcar l'element com a anotació viva sense exigir atenció.",
    },
    'body-glow': {
      alt: 'Brillantor ambient de la pàgina derivant darrere el contingut',
      longdesc:
        "La brillantor de fons ambient darrere el contingut de la pàgina. Animació: un gran degradat radial suau deriva lentament pel document, canviant posició i intensitat en un loop llarg. Disparador: corre contínuament a totes les pàgines. Tecnologia: un keyframe CSS (body-glow-drift) animant una capa de fons fixa — zero JavaScript. Propòsit: donar atmosfera i profunditat al tema fosc en lloc d'un fons pla.",
    },
  },
  tln: {
    'progress-bar': {
      alt: 'Barra de avansamento de rota che scoréa sul bordo de sora durante ła navegasion',
      longdesc:
        'Ła bara sotiłe de avansamento fissada sul bordo de sora del viewport. Animasion: un transform scaleX scoréa ła bara da xero a circa setanta par sento in quało secondo finché el canbio de rota xe in corso, dopo ła riva a sento par sento e ła sfuma sul posto cuando ła vista de destinasion xe pronta — noła torna mai indrìo in modo visibiłe. Trigger: partise a ogni navigasion interna e finise cuando ła nova vista xe montada. Tecnologia: transision CSS su transform e opacity guidae da do clase de stato — xero JavaScript par frame. Scopo: dir che una transision de pàxina xe in corso, in stiłe nprogress.',
    },
    'burger-button': {
      alt: 'Boton del menù hamburger co animassion morph liquida',
      longdesc:
        "El boton del menù hamburger in alto a destra de ogni pàgina. Animassion: morph liquido tra l'icona a tre linee e la X de sàrò — i trati i se piega e i se fon de come fluido invesse de xirar rigidi. Trigger: el scatta al clic/tocco quando el menù el se verze e el se invertisse quando el se sera; l'hover el canbia la tension dei trati. Tecnologia: widget canvas guidà da Rust/WASM (fragment shader WebGL), co variante worker WebGPU/OffscreenCanvas e fallback CSS puro. Scopo: comunicar el stà verto/serà del menù co na transission tàtile e fìsica.",
    },
    'nav-menu-background': {
      alt: 'Sfondo animà a schermo intiero del menù co canpo de contorni fluido',
      longdesc:
        "El sfondo a schermo intiero depint drìo l'overlay del menù de navigassion. Animassion: un canpo de contorni fratai in lento movimento — strati de rumore fbm i deriva e i se remodela continuamente, come miragio de calore o plasma. Trigger: el parte quando el menù hamburger el se verze, el se ferma e el vien scartà al serà. Tecnologia: fragment shader WebGL (fbm in GLSL) su canvas dedicà, co variante WebGPU/OffscreenCanvas su worker e fallback gradiente CSS stàtico. Scopo: dar al menù na profondità atmosférica viva invesse de un panè a tinta piata.",
    },
    'nav-menu': {
      alt: 'Vosi del menù de navigassion co entrata ascendente scajonada',
      longdesc:
        "L'overlay del menù de navigassion che el se verze dal boton hamburger. Animassion: ogni voze la entra co salita e fade scajonadi (nav-menu-item-in), licando de qualche pixel in alto mentre la comparisse; un sbarluso membrana/plasma el deriva sul panè in loop lento. Trigger: l'entrata la parte na olta per vertùra, sequensiada da sora a soto; la deriva de la membrana la gira in loop fin che el menù el xe verto. Tecnologia: keyframe CSS co delay per voze, zero JavaScript per frame. Scopo: sequensiar i link cussì l'ocio i li leze in órdene invesse de un flash ùgnego.",
    },
    'nav-flag': {
      alt: 'Icona bandiera de la lengua co animassion onda e entrata',
      longdesc:
        "El picenin canvas bandiera tacà a l'eticheta de la lengua inte la bara de navigassion. Animassion: la tea de la bandiera la ondula co un ripple sinusoidal e el glifo intiero el entra in scala (nav-flag-in) quando la nav la monta o la lengua la canbia. Tecnologia: widget canvas che el rende la bandiera proceduralmente (le bandiere de paesi spartii le xe composte), co el keyframe CSS che el gestisse l'entrata. Scopo: segnar la lengua ativa co na bandiera che la pàr tea, no na icona piata.",
    },
    'switch-slider': {
      alt: 'Interutor de preferensa co licada liquida del pollice',
      longdesc:
        "I interutori on/off drento el diàlogo dele preferense (aspeto, movimento, efeti). Animassion: el pollice el licà longo el binario co slongamento liquido — el se slonga durante el tragito e el torna a riposo, come na gosa. Trigger: el scatta al clic/tocco o a l'alternansa da tastiera. Tecnologia: widget WebGL/canvas (guidà da Rust/WASM) che el depinze binario e pollice, co fallback CSS par motori sensa WebGL. Scopo: render tàtile el stà binario e confermar che l'alternansa la xe avenua.",
    },
    'theme-slider': {
      alt: 'Seletor tema co licada orbitale dì/note',
      longdesc:
        "L'interutor tema ciaro/scuro inte el diàlogo preferense e inte la navigassion. Animassion: el pollice el viaja come un corpo orbitale — un disco dì/note el traversa el binario mentre glifi sol/luna i fa crossfade drento de lu. Trigger: el scatta a l'alternansa; anca na olta al caricamento quando el tema salvà el difarisse dal predefinì. Tecnologia: widget WebGL/canvas (guidà da Rust/WASM) co fallback CSS. Scopo: contar el canbio tema come na alba/tramonto invesse de un flip binario.",
    },
    'close-button': {
      alt: 'Boton sera co inpianto liquido e X xiratoria',
      longdesc:
        "El boton circular de sàrò dei modal e del lightbox media espanso. Animassion: in hover un inpianto liquido el sale drento el cerchio mentre i trati de la X i xira e i se tende; a la presion l'inpianto el scata. Trigger: hover/focus el lo arma, la presion la lo libera. Tecnologia: widget WebGL/canvas (guidà da Rust/WASM) co un semplice boton CSS soto par motori sensa WebGL. Scopo: dar al sàrò na sensassion fìsica e sodisfasente de presion.",
    },
    skeleton: {
      alt: 'Schèletro de caricamento co sele in morph e shimmer',
      longdesc:
        "I schèletri placeholder mostrai dóndo el contenuto el sta ancora cargando (figure media, blòchi de testo, tile de progeto). Animassion: sele de glifo i fa morph tra forme 0/1 mentre un sbarluso a gradiente el traversa la superficie da sinistra a destra (skeleton-shimmer). Trigger: el gira continuamente mentre el contenuto el carica, po el consegna a l'elemento real. Tecnologia: widget canvas (morph de sele guidà da Rust/WASM) pi' el keyframe CSS dello shimmer. Scopo: segnalar \"el contenuto el riva\" co un movimento che l'anticipa el layout invesse de uno spinner.",
    },
    'intro-loader': {
      alt: 'Loader de introdussion co anei contrarotanti e progresso',
      longdesc:
        "El loader de aviamento a schermo intiero mostrà mentre i primi asset del sito i carica. Animassion: do anei i xira in diressioni oposte (intro-loader-spin-cw/ccw) atorno a un contador de percentuale e mesagi de fase localissadi. Trigger: el gira dal caricamento de la pàgina fin che el bundle de aviamento el xe pronto, po l'intiero loader el sfunia e el se lea via. Tecnologia: keyframe CSS che i fa xirar i anei; el JS el riporta soło el progresso. Scopo: tener el primo paint vivo e legìbile durante la sequensa de aviamento tier/polyfill.",
    },
    'site-toast': {
      alt: 'Toast de notifega che el licà dal canton',
      longdesc:
        "El picenin toast de notifega che el comparisse in un canton dello schermo par eventi come conferme de copia e assioni sui cookie. Animassion: el licà dal bordo mentre el sfunia in alto (site-toast-in), el tien, po el ese licando indrio co fade. Trigger: scatenà da eventi de l'app (copia, avixo storage, notifega de test). Tecnologia: keyframe CSS in entrata e un modificador --closing in essita. Scopo: tirar l'ocio su un mesagio transitorio sensa blocar l'interassion.",
    },
    'mosaic-burn': {
      alt: 'Titolo del tile portfolio che el brusa in brase e el se ricompone',
      longdesc:
        "El testo del titolo sui tile del mosaico dei laori in evidensa. Animassion: in hover le letere del titolo le entra in combustión — bordi erosi, scie de brusadura e particèle de brasa incandescente le consuma i glifi colona par colona, e le letere le se ricostruisse dal basso a l'alto travers el stesso canpo de fogo quando el puntador el ese o l'hover el canbia bersagio. Trigger: hover del puntador sul tile. Tecnologia: simulassion particelare in Rust/WASM (crate mosaic-burn) che la eseguisse el modelo erode/scorch/ember su canvas; un percorso 2D-canvas el rende el stesso canpo quando la rota GPU la xe smorta — tuti do i condivide na simulassion deterministica. Scopo: trasformar el semplice hover inte l'efeto fogo firma del sito.",
    },
    'mosaic-tile': {
      alt: 'Tile portfolio che el licà in novo slot a moła + sbarluso sul bordo',
      longdesc:
        'Le card de progeto inte el mosaico dei laori in evidensa. Animassion: quando na card la se espande in hover, i vesini spostadi i licà intei novi slot co na moła smorsada — na curva orgànica de overshoot e assestamento (moła sintetissada in CSS linear()) invesse de una licada lineare; un sbarluso el percorre periodicamente el bordo de ogni tile. Trigger: el repack da hover el anima i tile spostadi; el sbarluso del bordo el gira in loop lieve. Tecnologia: pack masonry in JS + transission CSS su transform; el sbarluso el xe un passagio a anelo su canvas. Scopo: tener la paré liquida e viva mentre la se riórdena.',
    },
    'media-progressive': {
      alt: 'Imagine media che la pasa da sfocada in basa qualità a nitida in alta',
      longdesc:
        "Ogni figura media del sito (imagini e video dei progetti). Animassion: un placeholder a basa risolussion el depinze prima, po el fa morph verso l'asset a alta risolussion decodificà — el layer in alta el se resolve dallo stà sfocà/ingrandì de la thumb invesse de lampegiar, cussì l'ocio el leze na nitidessa continua. Trigger: el parte quando la figura la entra inte la viewport (IntersectionObserver) e l'asset el finisse el decode inte el pool WASM. Tecnologia: decode imagine WASM fora dal thread prinsipale, swap a blob-URL e morph in CSS/canvas. Scopo: render el caricamento progressivo come l'imagine che la entra a fóco, no na sostitussion seca.",
    },
    'glitch-portrait': {
      alt: 'Retrato About co animassion de corussion glitch VHS',
      longdesc:
        "L'imagine del retrato inte la session About. Animassion: corussion periodica stil VHS — roli de scanline, separassion dei canali, spostamenti de blòchi e bande de rumore i spasa brevemente la foto prima che la torni neta. Trigger: la gira su un timer casuale fin che la session la xe sullo schermo. Tecnologia: passagio de fragment shader WebGL su la texture del retrato co fallback canvas. Scopo: dar al retrato na personalità viva da video anàlogico, in linea co l'estetica tècnica del sito.",
    },
    'divider-sheen': {
      alt: 'Divisor del footer co un sbarluso de luse viajante',
      longdesc:
        "I divisori hairline che i separa sessioni de pàgina e colone del footer. Animassion: na banda morbida de luse la viaja lentamente longo el fil, spazando da un capo a l'altro in loop continuo. Trigger: la gira continuamente fin che el divisor el xe sullo schermo. Tecnologia: widget canvas che el depinze la linea pi' la banda a gradiente in movimento. Scopo: elevar na riga stàtica a un detagio sutile e vivo.",
    },
    'text-draw': {
      alt: 'Testo che el se desegna letera par letera come manoscrito',
      longdesc:
        "Titoli de session, link e didascalie co el tratamento draw-text in tuto el sito. Animassion: ogni caratere el xe desegnà stil tratto de pena in órdene de letùra — i trati i se scrive sequensialmente come caligrafìa o plotter, co ragrupamento opsionale par paroła. Trigger: el parte quando l'elemento el entra inte la viewport (IntersectionObserver, trigger viewport) o su dispatch esplicito. Tecnologia: desegno instansià par caratere su canvas (widget text-draw in Rust/WASM) co fallback keyframe CSS (char-draw/word-draw). Scopo: far sembrar i titoli autografadi — scriti avanti a ti invesse de timbradi.",
    },
    'ring-sheen': {
      alt: "Bordo tile co sbarluso che el viaja atorno a l'anelo",
      longdesc:
        "I contorni de bordo sui tile del mosaico e dei progetti coreladi. Animassion: na banda de sbarluso la viaja atorno a l'anelo del bordo del tile come luse che la licà su na cornise, in loop periodico lento. Trigger: la gira in loop fin che el tile el xe visìbile; la se intensifica in hover. Tecnologia: passagio a anelo su canvas conposto sora el bordo del tile. Scopo: tener vive le grije de card stàtiche co un riflesso anbientale econòmico.",
    },
    'corner-brackets': {
      alt: 'Àngui de boton che i espande in parentesi su hover',
      longdesc:
        'Le decorassioni a parentesi angulari sui botoni de assión (bare de sàrò, CTA). Animassion: le cuatro parentesi angulari le se espande verso fora e le se ilumina in hover, po le se contrae — come un reticolo de mesa a fóco de fotocàmera che el scata. Trigger: hover/focus sul boton. Tecnologia: picenin widget canvas par boton (desegno instansià de parentesi) co fallback a transission CSS. Scopo: comunicar interatività co un indisio de focus preciso e strumentale.',
    },
    'scene-3d': {
      alt: 'Sena 3D interativa de canpo stelare e tera',
      longdesc:
        "Le sene 3D a schermo intiero — l'esperimento star-field (corpi celesti in órbita co etichete dosier) e el playground de la tera (pianeta che el xira co controi de órbita). Animassion: movimento continuo ispirà a la fìsica — mecànica orbitale, rotassion, paralasse al movimento de càmera e transissioni tra corpi. Trigger: la gira par tuto el tempo che la sena la xe sullo schermo; puntador/toco el orbita la càmera. Tecnologia: three.js su WebGL/WebGPU co el laoro par frame mantegnuo su la GPU. Scopo: la vetrina 3D in tempo real firma del sito.",
    },
    'genie-modal': {
      alt: 'Media espanso che el se verze in warp liquido verso el lightbox',
      longdesc:
        "El lightbox media espanso che el se verze cicando su un'imagine o un video de progeto. Animassion: el media el se deforma tra el retàngolo de la figura cicada e la scatoła del modal a schermo intiero come un fogio liquido — bande orisontali le ritarda, le se incurva e le se stira travers un canpo genie mentre particèle de vapor le se staca da la piega in movimento; el stesso canpo el lo colasa indrio al serà. Trigger: clic/toco par vèrzar, boton sera o Escape par colasar. Tecnologia: widget WebGPU/Rust mesh-warp + particèle su un worker fora dal thread prinsipale quando abilità, un renderer 2D-canvas a bande sensa alocassioni par frame dapartuto altro, e un keyframe CSS de zoom come ùltima risorsa. Scopo: sostituir un seco scale-fade co na transission fìsica stil dock macOS.",
    },
    carousel: {
      alt: 'Caroselo premi che el licà co momentum e bara de progresso',
      longdesc:
        "El caroselo orisontale dei premi inte el footer de la home. Animassion: le vosi le licà co momentum e le fa snap in posission; na bara de progresso la se impienisse longo el binario, un tratto de autoplay el anima el timer e i controi de assión i comparisse. Trigger: gesti de strasinamento/scroll, controi precedente/sucesivo e el timer de autoplay. Tecnologia: scroll snapping nativo pi' springs in JS e keyframe CSS par el chrome. Scopo: far sembrar el sfogiamento de la striscia dei premi come mesclar carte fìsiche.",
    },
    'about-text': {
      alt: 'Paràgrafo About che el rivela i so carateri un a un',
      longdesc:
        "I paràgrafi de la biografìa inte la session About. Animassion: el testo el se rivela caratere par caratere inte l'órdene dele frasi — ogni letera la sfunia/la se move inte el so tempo, cussì el paràgrafo el pàr scrivarse da soło. Trigger: el parte quando la session la entra inte la viewport. Tecnologia: JS el sequensia span par caratere co timing guidà da rAF; el CSS el gestisse la transission par caratere. Scopo: dar a la bio na cadensa da màchina da scriver/vose in linea co i titoli draw-text.",
    },
    'related-tile': {
      alt: 'Card progeto corelà che la se sólza e la zooma su hover',
      longdesc:
        "Le card dei progetti coreladi in fondo a le pàgine de progeto. Animassion: in hover la card la se sólza, la so imagine la zooma dolcemente e título/descrission i licà su — tuto co easing a moła smorsada (springs sintetissadi in CSS linear()) cussì el movimento el pasa legermente e el se assesta in modo orgànico; un sbarluso el spasa el bordo de la card. Trigger: hover/focus del puntador. Tecnologia: transissioni CSS su transform/opacity guidade da curve a moła. Scopo: render l'affordance de navigassion fìsica e invitante.",
    },
    'note-dot': {
      alt: 'Marcador de nota che el pulsa dolcemente',
      longdesc:
        "I picenini marcadori de nota/ponto usadi inte le pàgine internals (documentassion e interne de progeto). Animassion: el ponto el pulsa dolcemente — un loop respirante de scala e fade. Trigger: el gira in loop continuo sullo schermo. Tecnologia: un keyframe CSS (note-dot-pulse). Scopo: segnar l'elemento come anotassion viva sensa esiger atension.",
    },
    'body-glow': {
      alt: 'Sbarluso anbientale de la pàgina che el deriva drìo el contenuto',
      longdesc:
        'El sbarluso de sfondo anbientale drìo el contenuto de la pàgina. Animassion: un gran gradiente radiale morbido el deriva lentamente travers el documento, canbiando posission e intensità in un loop longo. Trigger: el gira continuamente su ogni pàgina. Tecnologia: un keyframe CSS (body-glow-drift) che el anima un layer de sfondo fiso — zero JavaScript. Scopo: dar atmosfera e profondità al tema scuro invesse de un sfondo piato.',
    },
  },
  gn: {
    'progress-bar': {
      alt: 'Tape rape progresso barra ojegueraháva yvate gotyo navegasión aja',
      longdesc:
        "Barra michĩva tapejeporãha iñatĩva viewport yvate gotyo. Ñemongue'e: peteĩ transform scaleX ojopo pe barra zero guive haicha irundý por ciento peve hekópe segundo jave tapemoambue oĩ aja, upéi ohóva sa'y por ciento peve ha omondýi upépe pe vista ojehecháva oĩma — araka'eve ndojevu'ái ndaikatúi. Trigger: oñepyrũ peteĩteĩ navegasión interna rehe ha opa pe vista pyahu oñemontĩvo. Tembiporenda: CSS transitions transform ha opacity rehe, mokõi clase de estado omboguatareháva — JavaScript zero peteĩteĩ frame-pe. Haguã: ome'ẽ kuatiarogue moambue oĩhína, nprogress rupi.",
    },
    'burger-button': {
      alt: "Hamburger poravorã votõ liquid morph ñemongue'e",
      longdesc:
        "Hamburger poravorã votõ peteĩha tuja yvate akatĩ gotyo opa kuatiaroguépe. Ñemongue'e: liquid morph mbohapy rysy'i ikonogua ha X jejoko rehegua apytépe — umi rysy'i iñemokutu ha iñembojojuha ichaháicha, ndaha'éi hyapu'ỹva iñemongu'e hag̃ua. Trigger: oñepyrũ eikutu/tap jave poravorã ijurúvo ha opa'ỹvo jevy; hover omoambue umi rysy'i tension. Tembiporenda: canvas widget Rust/WASM omboguatareháva (WebGL fragment shader), WebGPU/OffscreenCanvas worker rehegua ha CSS añoite fallback. Haguã: ome'ẽ poravorã ijurúva/ijoko rehegua peteĩ ñemoambue añetegua ha mba'e añetehápe.",
    },
    'nav-menu-background': {
      alt: "Poravorã rugua mba'e'o'a oñemongue'e contorno campo iñemyasãiva",
      longdesc:
        "Poravorã rugua mba'e'o'a navegación overlay rupã. Ñemongue'e: fractal contorno campo iñemongu'e mbegue — fbm mba'e sapukai capa oñemyasãi ha oñemoambue tapere'ỹ, haku ñemomimby térã plasma ichaháicha. Trigger: oñepyrũ hamburger poravorã ijurúvo, opa ha oñembogue jave ijoko'ỹvo. Tembiporenda: WebGL fragment shader (fbm GLSL ryepýpe) canvas ha'etépe, WebGPU/OffscreenCanvas worker rehegua ha CSS gradiente estático fallback. Haguã: ome'ẽ poravorã pe hũgua mba'e'o'a ha ikoveva'ekue color panel peteĩha rã.",
    },
    'nav-menu': {
      alt: 'Navegación poravorã ítemgua oikekuaa escalonada yvategua',
      longdesc:
        "Navegación poravorã overlay ojejuruháva hamburger votõgui. Ñemongue'e: peteĩteĩ ítem oike iko'ẽvo ha fade escalonada rehegua (nav-menu-item-in), oñemosẽ sa'i pixel yvate gotyo osẽkuaa aja; membrana/plasma tesatĩ oñemyasãi panel rupi mbegue'ỹ. Trigger: oikekuaa oñepyrũ peteĩ jave ijurúvo, yvateguive guýpe peve; membrana ñemyasãi oñembo'ajevýva poravorã ijurúva aja. Tembiporenda: CSS keyframes delay peteĩteĩ ítem rehegua, JavaScript zero peteĩteĩ frame-pe. Haguã: omombe'u umi link he'ẽvo, anga kuerĩ omoñe'ẽ jave peteĩ ñemyasãi rã añónte.",
    },
    'nav-flag': {
      alt: "Ñe'ẽ poyvi ikonogua oñemongue'e ha oike ñemongue'e rehegua",
      longdesc:
        "Poyvi canvas michĩ ñe'ẽ etiqueta rehegua navegación barra-pe. Ñemongue'e: poyvi ava oñemongu'e sinusoidal ripple rehegua ha glifo opaite oike escala rehegua (nav-flag-in) nav omoĩva jave térã ñe'ẽ omoambuévo. Tembiporenda: canvas widget ojapo poyvi proceduralmente (tetã poyvi mba'e'a oñembojoaju), CSS keyframe ojapo oikekuaa rehe. Haguã: omomora'i ñe'ẽ activo peteĩ poyvi ojehechava'ekue ava ichaháicha, ndaha'éi ikonogua peteĩha.",
    },
    'switch-slider': {
      alt: 'Preferencia interrutor pollice licada liquida rehegua',
      longdesc:
        "On/off interrutorgua preferencia diálogo ryepýpe (apariencia, movimiento, efecto). Ñemongue'e: pollice oñemosẽ rail rupi licada liquida rehegua — oñemoñemonde trayecto aja ha ojevy ñembotýpe, gota ichaháicha. Trigger: oñepyrũ eikutu/tap jave térã teclado omoambuévo. Tembiporenda: WebGL/canvas widget (Rust/WASM omboguatareháva) ojapóva rail ha pollice, CSS fallback WebGL ndorekóiva g̃uarã. Haguã: ome'ẽ añetete estao binário ha omomorãi omoambue añetehápe.",
    },
    'theme-slider': {
      alt: 'Tema alternador licada orbital ára/pytũ rehegua',
      longdesc:
        "Tema hũ/pytũ interrutor preferencia diálogo-pe ha navegación-pe. Ñemongue'e: pollice ohóvo cuerpo orbital ichaháicha — ára/pytũ disco ohasa rail rupi kuarahy/jasy glifo ojapóvo crossfade hyepýpe. Trigger: oñepyrũ omoambuévo; avei peteĩ jave oñemyenóvo tema ñembyatypyréva ojogua'ỹva estándar ndive. Tembiporenda: WebGL/canvas widget (Rust/WASM omboguatareháva) CSS fallback rehegua. Haguã: omombe'u tema ñemoambue kuarahy ñesẽ/ike ichaháicha, ndaha'éi flip binário.",
    },
    'close-button': {
      alt: "Jejoko votõ relleno liquido ha X oñemongu'e rehegua",
      longdesc:
        "Votõ circular jejoko rehegua modal ha media lightbox expandido rehegua. Ñemongue'e: hover jave relleno liquido osẽ yvate círculo ryepýpe X rysy'i oñemongu'e ha oñemoapysãi aja; eikutu'ỹvo, relleno oñejoko. Trigger: hover/foco omboguata, eikutu'ỹvo ombotopa. Tembiporenda: WebGL/canvas widget (Rust/WASM omboguatareháva) CSS votõ simple guýpe WebGL ndorekóiva g̃uarã. Haguã: ome'ẽ jejoko pe sentimiento añetegua ha porã presión rehegua.",
    },
    skeleton: {
      alt: "Carga esqueleto cela morph ha tesa'ỹi rehegua",
      longdesc:
        "Esqueleto placeholder ojehechauka contenido oñemyenyhũ gueteri (media figura, texto bloque, proyecto tile). Ñemongue'e: glifo cela ojapo morph 0/1 mba'e apytépe tesa'ỹi gradiente ohasa superficie rupi asu'ẽ gotyo akatĩ gotyo (skeleton-shimmer). Trigger: omba'apo tapere'ỹ contenido oñemyenyhũ aja, upéi ome'ẽ elemento añetépe. Tembiporenda: canvas widget (cela morph Rust/WASM omboguatareháva) CSS shimmer keyframe rehegua. Haguã: ohechauka \"contenido og̃uahẽ\" ñemongu'e ojehechauka'ỹva layout spinner rã.",
    },
    'intro-loader': {
      alt: "Intro loader anillo oñemongu'e opaite ha progreso rehegua",
      longdesc:
        "Boot loader mba'e'o'a ojehechauka sitio asset ñepytyvõ oñemyenyhũ aja. Ñemongue'e: mokõi anillo oñemongu'e opaite mba'e'a (intro-loader-spin-cw/ccw) porcentaje contador ha etapa mensaje localizado ára rupi. Trigger: omba'apo kuatiarogue ñemyenyhũ guive boot bundle oĩva'ekue peve, upéi loader opaite osẽ ha oñemboguata. Tembiporenda: CSS keyframes ojapo umi anillo oñemongu'e; JS año omombe'u progreso. Haguã: oĩ paint ñepytyvõ ikove ha oñemoñe'ẽkuaáva tier/polyfill boot sequencia aja.",
    },
    'site-toast': {
      alt: 'Notificación toast oñemosẽ esquina guive',
      longdesc:
        "Notificación toast michĩ osẽkuaa pantalla esquinápe copia confirmación ha cookie acción rehegua. Ñemongue'e: oñemosẽ borde guive osẽ fade rehegua (site-toast-in), oĩ ha osẽ oñemosẽ jevy fade rehegua. Trigger: ojejeg̃ua app evento rupi (copia, almacenamiento aviso, test notificación). Tembiporenda: CSS keyframes oikekuaa-pe ha --closing modificador osẽkuaa-pe. Haguã: omoĩ ojapóva mensaje transitorio ñemongu'e ñemongu'e'ỹ rehegua.",
    },
    'mosaic-burn': {
      alt: "Portfolio tile título oka'y tatápe ha ojapo jey",
      longdesc:
        "Título texto portfolio tile-pe mosaico trabajo destacado rehegua. Ñemongue'e: hover jave título letra oka'y — borda erosionado, quemado estela ha tatasũ partícula incandescente ojepo glifo columna ha columna, ha letra ojapo jey guýpe yvate gotyo itatá campo rupi puntero osẽ'ỹvo térã hover omoambuévo objetivo. Trigger: puntero hover tile rehe. Tembiporenda: Rust/WASM partícula simulación (mosaic-burn crate) omboguatareháva erode/scorch/ember modelo canvas-pe; 2D-canvas tape ojapo upe campo GPU tape ojejoko'ỹvo jave — mokõive oguereko peteĩ simulación determinística. Haguã: omoambue hover simple sitio tata efecto insignia-pe.",
    },
    'mosaic-tile': {
      alt: "Portfolio tile oñemosẽ slot pyahu muelle + borda tesa'ỹi rehegua",
      longdesc:
        "Proyecto tarjeta mosaico trabajo destacado ruguápe. Ñemongue'e: tarjeta oñembotuichávo hover jave, vecino oñemomovéva oñemosẽ slot pyahu muelle amortiguado rehegua — curva orgánica overshoot ha asentamiento rehegua (muelle sintetizado CSS linear()-pe) licada lineal rã; tesa'ỹi ohasa tile borda periódicamente. Trigger: hover repack ojapo tile oñemomovéva rehegua; borda tesa'ỹi oñembo'ajevýva mimbu\u1e7fpe. Tembiporenda: masonry pack JS-pe + CSS transición transform-pe; tesa'ỹi ha'e anillo pasada canvas-pe. Haguã: oĩ rugua líquido ha ikove ojapo jey aja.",
    },
    'media-progressive': {
      alt: "Media imagen ohasa ojehecha'ỹ baja calidad gui nitida alta calidad-pe",
      longdesc:
        "Opa media figura sitio-pe (proyecto imagen ha video). Ñemongue'e: placeholder baja resolución ojapo peteĩha, upéi ojapo morph asset alta resolución decodificado-pe — alta capa osoluciona thumb ojehecha'ỹ/agrandado estado guive ojehechauka'ỹ rã, anga kuerĩ omoñe'ẽ nitidez continua. Trigger: oñepyrũ figura oikekuaa viewport-pe (IntersectionObserver) ha asset opa decode WASM pool-pe. Tembiporenda: WASM imagen decode hilo principal guive, blob-URL ñemoambue ha CSS/canvas morph. Haguã: ojapo carga progresiva imagen oike enfoque ichaháicha, ndaha'éi ñemoambue hyapu'ỹva.",
    },
    'glitch-portrait': {
      alt: "About retrato VHS glitch corrupción ñemongue'e rehegua",
      longdesc:
        "Retrato imagen About sección-pe. Ñemongue'e: corrupción periódica VHS estilo — scanline rol, canal ñemboja'o, bloque oñemomové ha sapukai banda ohasa foto ári sa'i osẽ limpio mboyve. Trigger: omba'apo timer aleatorio sección ojehechauka pantalla-pe aja. Tembiporenda: WebGL fragment shader pasada retrato textura rehe canvas fallback rehegua. Haguã: ome'ẽ retrato pe personalidad ikove video analógico, sitio técnico estética rehe.",
    },
    'divider-sheen': {
      alt: "Footer divisor tesa'ỹi mba'e'a ohóva",
      longdesc:
        "Hairline divisor omopa'ũ kuatiarogue sección ha footer columna. Ñemongue'e: tesa'ỹi banda mimbu\u1e7f ohóva mbegue filo rupi, ohasa peteĩ mba'e'a gotyo ambuépe loop continuo-pe. Trigger: omba'apo tapere'ỹ divisor ojehechauka pantalla-pe aja. Tembiporenda: canvas widget ojapóva línea ha gradiente banda iñemongu'e. Haguã: ojapo línea estático detalle sutile ha ikove.",
    },
    'text-draw': {
      alt: 'Texto ojejegua letra ha letra manuscrito ichaháicha',
      longdesc:
        "Sección título, link ha leyenda draw-text tratamiento rehegua sitio tuichakue. Ñemongue'e: peteĩteĩ carácter ojejegua pena trazo estilo ñemoñe'ẽ órden-pe — trazo ojejegua secuencialmente caligrafía térã plotter ichaháicha, ñe'ẽ agrupación opcional rehegua. Trigger: oñepyrũ elemento oikekuaa viewport-pe (IntersectionObserver, viewport trigger) térã dispatch explícito rupi. Tembiporenda: carácter instanciado dibujo canvas-pe (text-draw widget Rust/WASM-pe) CSS keyframe fallback rehegua (char-draw/word-draw). Haguã: ojapo título ojehechauka autografiado — ehechápe ojejegua estampado rã.",
    },
    'ring-sheen': {
      alt: "Tile borda tesa'ỹi ohóva anillo rupi",
      longdesc:
        "Borda contorno mosaico ha proyecto relacionado tile-pe. Ñemongue'e: tesa'ỹi banda ohóva tile borda anillo rupi tesa'ỹi oñemosẽ marco-pe ichaháicha, loop periódico mbegue'ỹ. Trigger: oñembo'ajevýva tile ojehechauka aja; oñembotuicha hover jave. Tembiporenda: anillo pasada canvas-pe tile borda ári. Haguã: oĩ tarjeta grilla estático ikove tesa'ỹi ambiente rehegua.",
    },
    'corner-brackets': {
      alt: 'Votõ canto corchete oñembotuicha hover jave',
      longdesc:
        "Canto corchete decoración acción votõ-pe (jejoko barra, CTA). Ñemongue'e: irundýa canto corchete oñembotuicha oje'ỹ gotyo ha oñemopotĩ hover jave, upéi oñemomichĩ jevy — cámara enfoque retículo ojejoko'ỹva ichaháicha. Trigger: hover/foco votõ rehe. Tembiporenda: canvas widget michĩ votõ rehegua (corchete dibujo instanciado) CSS transición fallback rehegua. Haguã: ome'ẽ interactividad enfoque indicio preciso ha instrumental rehegua.",
    },
    'scene-3d': {
      alt: '3D escena interactiva mbyja campo ha yvy rehegua',
      longdesc:
        "3D escena mba'e'o'a — star-field experimento (yvaga mba'e órbita dossier etiqueta rehegua) ha yvy playground (planeta oñemongu'e órbita contro rehegua). Ñemongue'e: movimiento continuo física inspirado — orbital mecánica, rotación, cámara paralaje movimiento ha transición mba'e apytépe. Trigger: omba'apo opa ára escena pantalla-pe aja; puntero/tou orbita cámara. Tembiporenda: three.js WebGL/WebGPU ári frame mba'e GPU-pe. Haguã: sitio insignia real-time 3D vitrina.",
    },
    'genie-modal': {
      alt: 'Media expandido ijurúva warp líquido lightbox-pe',
      longdesc:
        "Media expandido lightbox ojejuruháva proyecto imagen térã video eikutu'ỹvo. Ñemongue'e: media oñemodeforma figura eikutupyréva rectángulo ha modal mba'e'o'a apytépe lámina líquida ichaháicha — banda horizontal oñemoñemonde, oñemokutu ha oñemopu'a genie campo rupi vapor partícula oñemboja'o pliegue iñemongu'e guive; upe campo ojapo jey jejoko'ỹvo. Trigger: clic/tap ijurú hag̃ua, jejoko votõ térã Escape oñemomichĩ hag̃ua. Tembiporenda: WebGPU/Rust mesh-warp + partícula widget worker hilo principal guive ojehabilit'ỹvo, 2D-canvas banda renderer alocación'ỹ frame rehegua ambuépe, ha CSS zoom keyframe último recurso. Haguã: oñemosalino scale-fade hyapu'ỹva transición física macOS dock estilo rehegua.",
    },
    carousel: {
      alt: 'Premio carrusel oñemosẽ momentum ha progreso barra rehegua',
      longdesc:
        "Premio carrusel horizontal home footer-pe. Ñemongue'e: ítem oñemosẽ momentum rehegua ha ojapo snap posición-pe; progreso barra oñemyenyhũ rail rupi, autoplay trazo ojapo temporizador ñemongue'e ha acción contro osẽkuaa. Trigger: arrastre/scroll gesto, anterior/siguiente contro ha autoplay timer. Tembiporenda: scroll snapping nativo JS spring ha CSS keyframes chrome rehegua. Haguã: ojapo premio tira ñemohenda tarjeta física oñembojoaju ichaháicha.",
    },
    'about-text': {
      alt: 'About parágrafo ojehechauka carácter peteĩ ha peteĩ',
      longdesc:
        "Biografía parágrafo About sección-pe. Ñemongue'e: texto ojehechauka carácter ha carácter ñe'ẽjoaju órden-pe — peteĩteĩ letra osẽ/oñemongu'e itiempo-pe, parágrafo ojapo ichaháicha. Trigger: oñepyrũ sección oikekuaa viewport-pe. Tembiporenda: JS osecuencia carácter span rAF timing omboguatareháva; CSS ojapo carácter transición rehe. Haguã: ome'ẽ bio pe cadencia máquina de escribir/ñe'ẽ draw-text título rehe.",
    },
    'related-tile': {
      alt: 'Proyecto relacionado tarjeta oñembotuicha ha zoom hover jave',
      longdesc:
        "Proyecto relacionado tarjeta proyecto kuatiarogue opa'ỹvo. Ñemongue'e: hover jave tarjeta oñembotuicha, imagen ojapo zoom mimbu\u1e7f ha título/descrición osẽ yvate — opaite muelle amortiguado easing rehegua (spring sintetizado CSS linear()-pe) movimiento ohasa sa'i ha oñembot\u1e7f orgánicamente; tesa'ỹi ohasa tarjeta borda. Trigger: puntero hover/foco. Tembiporenda: CSS transición transform/opacity muelle curva omboguatareháva. Haguã: ojapo navegación affordance añetegua ha omo\u1e7f\u1e7fva.",
    },
    'note-dot': {
      alt: "Nota marcador oñemongu'e mimbu\u1e7f",
      longdesc:
        "Nota/ponto marcador michĩ internals kuatiarogue-pe (documentación ha proyecto interna). Ñemongue'e: ponto oñemongu'e mimbu\u1e7f — escala ha fade respiración loop. Trigger: oñembo'ajevýva pantalla-pe. Tembiporenda: peteĩ CSS keyframe (note-dot-pulse). Haguã: omomora'i elemento anotación ikove atención jerure'ỹ.",
    },
    'body-glow': {
      alt: "Kuatiarogue tesa'ỹi ambiente oñemyasãi contenido rupã",
      longdesc:
        "Tesa'ỹi fondo ambiente kuatiarogue contenido rupã. Ñemongue'e: radial gradiente tuicha mimbu\u1e7f oñemyasãi mbegue documento rupi, omoambue posición ha intensidad loop ipukúva. Trigger: omba'apo tapere'ỹ opa kuatiaroguépe. Tembiporenda: peteĩ CSS keyframe (body-glow-drift) ojapo fondo capa fijo ñemongue'e — JavaScript zero. Haguã: ome'ẽ tema pytũ atmósfera ha hũgua fondo peteĩha rã.",
    },
  },
  ga: {
    'progress-bar': {
      alt: 'Barra dul chun cinn bealaigh ag snámh trasna an bharr le linn nascleanúna',
      longdesc:
        'An barra tanaí dul chun cinn socraithe ag barr an radhairc. Beochan: scuabann transform scaleX an barra ó nialas go dtí thart ar sheachtó faoin gcéad thar roinnt soicind agus athrú bealaigh ar siúl, ansin téann sé go dtí céad faoin gcéad agus cimeálann sé ar an áit nuair a réitíonn an radharc sprice — ní chuaileann sé siar go feiceálach riamh. Spreagthóir: tosaíonn ar gach nascleanúint inmheánach agus críochnaíonn nuair a shuiteáiltear an radharc nua. Teicneolaíocht: trasitionanna CSS ar transform agus opacity faoi dhá aicme stáda — nialas JavaScript in aghaidh fráma. Cuspóir: a chur in iúl go bhfuil aistriú leathanaigh ar siúl, i stíl nprogress.',
    },
    'burger-button': {
      alt: 'Cnaipe an liosta hamburgar le beochan morph leachtach',
      longdesc:
        'Cnaipe an liosta hamburgar sa choirnéal ar an gceann deas gach leathanaigh. Beochan: morph leachtach idir an íocón trí líne agus an X dúntha — lúbann agus comhleánn na stríoca mar leacht seachas rothlú go docht. Spreagthóir: imríonn sé ar chliceáil/tap nuair a osclaíonn an liosta agus aisiompú nuair a dhúnann sé; athraíonn an hover teannas na stríoca. Teicneolaíocht: giuirléid canabhais faoi threoir Rust/WASM (fragment shader WebGL), le malairt oibrí WebGPU/OffscreenCanvas agus cúltaca CSS glan. Cuspóir: staid oscailte/dúnta an liosta a chur in iúl trí aistriú tadhallach agus fisiciúil.',
    },
    'nav-menu-background': {
      alt: 'Cúlra beoite lánscáileáin an liosta le réimse imlíneach sreabach',
      longdesc:
        "An cúlra lánscáileáin péinteáilte taobh thiar d'fhorleagan an liosta nascleanúna. Beochan: réimse imlíneach fractail ag bogadh go mall — sreabhann agus athmhúnlaíonn sraitheanna de thorann fbm go leanúnach, amhail gaoth teasa nó plasma. Spreagthóir: tosaíonn nuair a osclaíonn an liosta hamburgar, stopann agus diúscairtear nuair a dhúnann sé. Teicneolaíocht: fragment shader WebGL (fbm in GLSL) ar chanabhas tiomnaithe, le malairt WebGPU/OffscreenCanvas in oibrí agus cúltaca grádán statach CSS. Cuspóir: doimhneacht atmaisféarach bheo a thabhairt don liosta seachas painéal datha álainn.",
    },
    'nav-menu': {
      alt: 'Míreanna an liosta nascleanúna le hiontráil ardaithe céimithe',
      longdesc:
        'Forleagan an liosta nascleanúna a osclaíonn ón gcnaipe hamburgar. Beochan: tagann gach mír isteach le hardú agus fade céimithe (nav-menu-item-in), ag sleamhnú cúpla picteilín suas agus í ag teacht chun cinn; sreabhann loinnir scamhán/plasma trasna an phainéil i lúb mhall. Spreagthóir: imríonn an iontráil uair amháin in aghaidh oscailte, seiceáilte ó bharr go bun; ritheann sreabhadh an scamháin fad atá an liosta oscailte. Teicneolaíocht: keyframes CSS le moill in aghaidh mír, nialas JavaScript in aghaidh fráma. Cuspóir: naisc a sheiceáil chun go léann an tsúil iad in ord in ionad splanc amháin.',
    },
    'nav-flag': {
      alt: 'Íocón bratach an teanga le beochan tonn agus iontrála',
      longdesc:
        'An chanabhas bratach beag in aice le lipéad an teanga sa bharra nascleanúna. Beochan: tonnlaíonn éadach na brataí le ripple sinusoidach agus tagann an ghlif iomlán isteach le scála (nav-flag-in) nuair a shuiteáiltear an nav nó nuair a athraítear an teanga. Teicneolaíocht: giuirléid canabhais a rindreáil an bhratach go nós imeachtaí (comhdhéantar brataí tíortha roinnte), leis an keyframe CSS ag láimhseáil na hiontrála. Cuspóir: an teanga ghníomhach a chomharthaíocht le bratach a léamh mar éadach, ní mar íocón álainn.',
    },
    'switch-slider': {
      alt: 'Lasc rogha le sleamhnú leachtach an ordóige',
      longdesc:
        "Na lasca air/míchumas laistigh den idirphlé roghanna (cuma, gluaiseacht, éifeachtaí). Beochan: sleamhnaíonn an t-ordóg feadh an ràil le síneadh leachtach — síneann sé le linn an turas agus preabann sé ar ais chun suaimhnis, amhail braon. Spreagthóir: imríonn sé ar chliceáil/tap nó ar athrú trí mhéarchlár. Teicneolaíocht: giuirléid WebGL/canabhais (faoi threoir Rust/WASM) ag péinteáil an ràil agus an ordóige, le cúltaca CSS d'innill gan WebGL. Cuspóir: déanann sé an staid dhénártha tadhallach agus deimhníonn gur tharla an t-athrú.",
    },
    'theme-slider': {
      alt: 'Malartóir téama le sleamhnú fithiseach lá/oíche',
      longdesc:
        'An lasc téama éadrom/dorcha san idirphlé roghanna agus sa nascleanúint. Beochan: taistealaíonn an t-ordóg mar choirp fithiseach — trasnaíonn diosc lá/oíche an ràil fad a dhéanann glifí gréine/gealaí crossfade laistigh de. Spreagthóir: imríonn sé ar athrú; uair amháin freisin ag lódáil nuair a éiríonn an téama sábháilte ón réamhshocraithe. Teicneolaíocht: giuirléid WebGL/canabhais (faoi threoir Rust/WASM) le cúltaca CSS. Cuspóir: scéal a insean faoin athrú téama mar éirí/luighe gréine in ionad smeach dhénártha.',
    },
    'close-button': {
      alt: 'Cnaipe dún le líonadh leachtach agus X rothlach',
      longdesc:
        "An cnaipe ciorclach dún ar mhodail agus ar an lightbox meáin fairsingthe. Beochan: ar hover éiríonn líonadh leachtach laistigh den chiorcal fad a rothlaíonn stríoca an X agus a ghearaíonn; ar bhrú, tógann an líonadh. Spreagthóir: armálann hover/fócas é, scaoileann brú é. Teicneolaíocht: giuirléid WebGL/canabhais (faoi threoir Rust/WASM) le cnaipe CSS simplí thíos d'innill gan WebGL. Cuspóir: mothú fisiciúil agus sásúil brú a thabhairt don dhún.",
    },
    skeleton: {
      alt: 'Cnámharlach lódála le cealla morph agus loinnir',
      longdesc:
        'Na cnámharlaigh placeholder a thaispeántar áit a bhfuil an t-ábhar fós ag lódáil (figiúirí meáin, bloic téacs, tíleanna tionscadail). Beochan: déanann cealla glif morph idir cruthanna 0/1 fad a thrasnaíonn loinnir grádán an dromchla ó chlé go deas (skeleton-shimmer). Spreagthóir: ritheann go leanúnach fad a lódálann an t-ábhar, ansin tugann sé chun an eilimint fíor. Teicneolaíocht: giuirléid canabhais (morph cealla faoi threoir Rust/WASM) móide an keyframe CSS shimmer. Cuspóir: "tagann an t-ábhar" a chomharthaíocht le gluaiseacht a réamh-íomhá an leagan amach in ionad spinner.',
    },
    'intro-loader': {
      alt: 'Lódálaí iontrála le fáinní contrarothlacha agus dul chun cinn',
      longdesc:
        'An lódálaí tosaithe lánscáileáin a thaispeántar fad a lódálann chéad shócmhainní an tsuímh. Beochan: rothlaíonn dhá fháinne i dtreonna urchomhaireacha (intro-loader-spin-cw/ccw) timpeall ar chuntar céatadáin agus teachtaireachtaí céime logánaithe. Spreagthóir: ritheann ó lódáil an leathanaigh go dtí go bhfuil an bundle tosaithe réidh, ansin céadaíonn an lódálaí iomlán agus baintear é. Teicneolaíocht: keyframes CSS ag rothlú na bhfáinní; ní thuairiscíonn JS ach dul chun cinn. Cuspóir: an chéad paint a choinneáil beo agus inléite le linn na seicheamh tosaithe tier/polyfill.',
    },
    'site-toast': {
      alt: 'Tósta fógra ag sleamhnú isteach ón choirnéal',
      longdesc:
        "An tósta fógra beag a thagann chun cinn i gcoirnéal an scáileáin d'imeachtaí mar dhearbhuithe cóipe agus gníomhartha fianán. Beochan: sleamhnaíonn sé isteach ón imeall ag éiri suas le fade (site-toast-in), coinníonn, ansin éiríonn sé amach ag sleamhnú ar ais le fade. Spreagthóir: seoltar é ag imeachtaí an aip (cóip, fógra stórála, fógra tástála). Teicneolaíocht: keyframes CSS ar an iontráil agus mionathraitheoir --closing ar an imeacht. Cuspóir: súil a tharraingt chuig teachtaireacht shealadach gan an idirghníomhaíocht a chosc.",
    },
    'mosaic-burn': {
      alt: 'Teideal tíle phunainne ag dó in eibhlí agus ag athfhoirmiú',
      longdesc:
        'Téacs an teidil ar thíleanna mósáic na n-oibreacha sainiúla. Beochan: ar hover dódh litreacha an teidil — itheann imeall creimthe, rianta loiscnithe agus cáithníní eibhlí gealaithe na glifí colún ar cholún, ansin athfhoirmíonn na litreacha ó bhun go barr tríd an réimse tine céanna nuair a fhágann an pointeoir nó nuair a athraíonn an hover sprioc. Spreagthóir: hover an pointeora ar an tíl. Teicneolaíocht: insamhaltas cáithníní in Rust/WASM (crate mosaic-burn) ag rith an tsamhail erode/scorch/ember ar chanabhas; rindreálann cosán 2D-canabhais an réimse céanna nuair atá an bealach GPU múchta — roinneann an dá cheann insamhaltas cinntitheach amháin. Cuspóir: an hover simplí a iompú isteach san éifeacht dóiteáin shainithe an tsuímh.',
    },
    'mosaic-tile': {
      alt: 'Tíle phunainne ag sleamhnú go sliotán nua ar sprionga + loinnir ar an imeall',
      longdesc:
        'Na cártaí tionscadail sa bhalla mósáic na n-oibreacha sainiúla. Beochan: nuair a leathnaíonn cárta ar hover, sleamhnaíonn na comharsana aistrithe chuig a sliotáin nua ar sprionga maolaithe — cuar orgánach ró-theacht agus suímh (sprionga sintéisithe in CSS linear()) in ionad sleamhnú líneach; trasnaíonn loinnir go tréimhsiúil imeall gach tíle. Spreagthóir: beochan repack hover na tíleanna aistrithe; ritheann loinnir an imeall go bog. Teicneolaíocht: pacáil masonry in JS + aistriú CSS ar transform; is é an loinnir pas fáinne ar chanabhas. Cuspóir: an bhalla a choinneáil leachtach agus beo fad atá sé ag atheagrú.',
    },
    'media-progressive': {
      alt: 'Íomhá meáin ag morphú ó dhofa ísealchaighdeáin go géar ardchaighdeán',
      longdesc:
        'Gach figiúr meáin ar an suíomh (íomhánna agus físeáin na dtionscadal). Beochan: péinteálann placeholder ísealtaifigh ar dtús, ansin déanann sé morph chuig an sócmhainn ardtaifigh díchódaithe — réitíonn an ciseal ard as staid dofa/zúmáilte an thumb in ionad splancadh, mar sin léann an tsúil géarú leanúnach. Spreagthóir: tosaíonn nuair a théann an figiúr isteach sa viewport (IntersectionObserver) agus a chríochnaíonn an sócmhainn a díchódú sa linn WASM. Teicneolaíocht: díchódú íomhá WASM lasmuigh den phríomh-shnàithe, malartú blob-URL agus morph in CSS/canabhas. Cuspóir: déanann sé an lódáil réamhchéimithe chosúil leis an íomhá ag teacht i bhfócas, ní malartú crua.',
    },
    'glitch-portrait': {
      alt: 'Portráid About le beochan truailliú glitch VHS',
      longdesc:
        'Íomhá na portráide sa rannóg About. Beochan: truailliú tréimhsiúil stíl VHS — rollaí scanline, scoilt chainéil, aistrithe bloc agus bandaí torainn a ghuairneán an grianghraf go hachomair sula bpilleann sé glan. Spreagthóir: ritheann ar amadóir randamach fad atá an rannóg ar an scáileán. Teicneolaíocht: pas fragment shader WebGL ar uigeacht na portráide le cúltaca canabhais. Cuspóir: pearsantacht bheo físeán analógach a thabhairt don phortráid, ag teacht le haistéitic theicniúil an tsuímh.',
    },
    'divider-sheen': {
      alt: 'Deighilteoir an bhoinn le loinnir solais taistil',
      longdesc:
        'Na deighilteoirí hairline a dheighleann rannóga leathanaigh agus colúin an bhoinn. Beochan: taistealaíonn banna bog solais go mall feadh na líne, ag scuabadh ó cheann go ceann i lúb leanúnach. Spreagthóir: ritheann go leanúnach fad atá an deighilteoir ar an scáileán. Teicneolaíocht: giuirléid canabhais ag péinteáil na líne móide an banna grádán gluasta. Cuspóir: riail statach a ardú go mionteaghas beo.',
    },
    'text-draw': {
      alt: 'Téacs ag tarraingt é féin litir ar litir mar lámhscríbhinn',
      longdesc:
        'Teidil rannóg, naisc agus fotheidil leis an gcoireáil draw-text ar fud an tsuímh. Beochan: tarraingítear gach carachtar stíl stríoc peann in ord léitheoireachta — scríobhann na stríoca iad féin go seicheamhach mar chailigrafacht nó plotter, le grúpáil roghnach in aghaidh focal. Spreagthóir: imríonn nuair a théann an eilimint isteach sa viewport (IntersectionObserver, spreagthóir viewport) nó ar dispatch sainráite. Teicneolaíocht: tarraingt ionsantaithe in aghaidh carachtar ar chanabhas (giuirléid text-draw in Rust/WASM) le cúltaca keyframe CSS (char-draw/word-draw). Cuspóir: déanann sé na teidil cosúil le sínithe láimhe — scríofa os do chomhair in ionad stampáilte.',
    },
    'ring-sheen': {
      alt: 'Imeall tíle le loinnir ag taisteal timpeall an fháinne',
      longdesc:
        'Na chontúir imeall ar thíleanna mósáic agus tionscadal gaolmhar. Beochan: taistealaíonn banna loinnire timpeall fáinne imeall na tíle mar sholas ag sleamhnú thar fráma, i lúb thréimhsiúil mhall. Spreagthóir: lúbaíonn fad atá an tíl le feiceáil; déantar é a neartú ar hover. Teicneolaíocht: pas fáinne ar chanabhas comhdhéanta os cionn imeall na tíle. Cuspóir: greillí cártaí statacha a choinneáil beo le loinnir chomhthimpeallach saor.',
    },
    'corner-brackets': {
      alt: 'Cúinní cnaipe ag leathnú in lúibíní ar hover',
      longdesc:
        'Na maisiúcháin lúibíní cúinne ar chnaipí gníomhaíochta (barraí dún, CTAí). Beochan: leathnaíonn na ceithre lúibíní cúinne amach agus soilsíonn ar hover, ansin conrtaíonn siad ar ais — amhail reticle fócais ceamara a ghlasáil. Spreagthóir: hover/fócas ar an gcnaipe. Teicneolaíocht: giuirléid canabhais bheag in aghaidh cnaipe (tarraingt ionsantaithe lúibíní) le cúltaca aistrithe CSS. Cuspóir: idirghníomhaíocht a chur in iúl le leid fócais bheachtais, ionstraimí.',
    },
    'scene-3d': {
      alt: 'Radharc 3D idirghníomhach réilt-earra agus domhan',
      longdesc:
        'Na radhairc 3D lánscáileáin — an turas turgnamhach star-field (coirp neamhaí ar fhithis le lipéid chomhad) agus an playground domhan (pláinéad ag rothlú le rialuithe fithise). Beochan: gluaiseacht leanúnach bunaithe ar fhisic — meicnic fhithiseach, rothlú, parallax ar ghluaiseacht ceamara agus aistrithe idir choirp. Spreagthóir: ritheann an t-am ar fad atá an radharc ar an scáileán; orbitálann pointeoir/teagmháil an ceamara. Teicneolaíocht: three.js thar WebGL/WebGPU le obair in aghaidh fráma ar an GPU. Cuspóir: taispeántas 3D fíor-ama shainithe an tsuímh.',
    },
    'genie-modal': {
      alt: 'Meán fairsingthe ag warping go leachtach isteach sa lightbox',
      longdesc:
        'An lightbox meáin fairsingthe a osclaíonn ar chliceáil íomhá nó físeán tionscadail. Beochan: déanann an meán warp idir dronuilleog an fhigiúir chliceáilte agus bosca an mhodail lánscáileáin mar bhileog leachtach — moilleannaíonn, lúbann agus síneann bandaí cothrománacha trí réimse genie fad a scaoileann cáithníní gaile den fhilteán gluasta; déanann an réimse céanna é a dhúnadh ar ais ar dhúnadh. Spreagthóir: cliceáil/tap chun oscailt, cnaipe dún nó Escape chun dúnadh. Teicneolaíocht: giuirléid WebGPU/Rust mesh-warp + cáithníní ar oibrí lasmuigh den phríomh-shnàithe nuair a chumasítear, rindireoir 2D-canabhais bandaí gan leithdháileadh in aghaidh fráma áit ar bith eile, agus keyframe CSS zúmáil mar dheireadh. Cuspóir: aistriú fisiciúil stíl dock macOS a chur in ionad scale-fade crua.',
    },
    carousel: {
      alt: 'Meall duaiseanna ag sleamhnú le móiminteam agus barra dul chun cinn',
      longdesc:
        'An meall duaiseanna cothrománach i mbun an leathanaigh bhaile. Beochan: sleamhnaíonn na míreanna le móiminteam agus déanann snap ar a suíomh; líontar barra dul chun cinn feadh an ràil, beochan stríoc autoplay an t-amadóir agus tagann na rialuithe gníomhaíochta chun cinn. Spreagthóir: gothaí tarraingthe/scrollaigh, rialuithe roimhe/in aghaidh agus amadóir an autoplay. Teicneolaíocht: scroll snapping dúchasach móide springs in JS agus keyframes CSS don chrome. Cuspóir: déanann sé brabhsáil an stiall duaiseanna cosúil le cártaí fisiciúla a mheascadh.',
    },
    'about-text': {
      alt: 'Alt About ag nochtadh a charachtair ceann ar cheann',
      longdesc:
        'Na hailt bheathaisnéise sa rannóg About. Beochan: nochtann an téacs a charachtair ceann ar cheann in ord na n-abairtí — tagann/bogann gach litir ar a chuid ama féin, mar sin cosúil leis an alt ag scríobh é féin. Spreagthóir: imríonn nuair a théann an rannóg isteach sa viewport. Teicneolaíocht: seiceálaíonn JS spanna in aghaidh carachtar le timing faoi threoir rAF; láimhseálann CSS an t-aistriú in aghaidh carachtar. Cuspóir: cadence clóscríobháin/gutha a thabhairt don bheathaisnéis ag teacht leis na teidil draw-text.',
    },
    'related-tile': {
      alt: 'Cárta tionscadail ghaolmhar ag ardú agus zúmáil ar hover',
      longdesc:
        'Na cártaí tionscadail ghaolmhar ag bun na leathanaigh tionscadail. Beochan: ar hover ardaíonn an cárta, zúmálann a íomhá go bog agus sleamhnaíonn teideal/cur síos suas — ar fad ar easing sprionga maolaithe (springs sintéisithe in CSS linear()) ionas go dtéann an ghluaiseacht thar beagán agus go suíonn sé go orgánach; scuabann loinnir imeall an chárta. Spreagthóir: hover/fócas an pointeora. Teicneolaíocht: aistrithe CSS ar transform/opacity faoi threoir cuair sprionga. Cuspóir: déanann sé an affordance nascleanúna fisiciúil agus cuireadhach.',
    },
    'note-dot': {
      alt: 'Marcálaí nóta ag pulsáil go bog',
      longdesc:
        'Na marcálaithe nóta/pointe beaga a úsáidtear ar leathanaigh internals (doiciméadú agus inmheánacha tionscadail). Beochan: pulsann an pointe go bog — lúb análaithe de scála agus fade. Spreagthóir: lúbaíonn go leanúnach ar an scáileán. Teicneolaíocht: keyframe CSS amháin (note-dot-pulse). Cuspóir: an eilimint a chomharthaíocht mar nóta beo gan aird a éileamh.',
    },
    'body-glow': {
      alt: 'Loinnir chomhthimpeallach an leathanaigh ag sreabhadh taobh thiar den ábhar',
      longdesc:
        "An loinnir chúlra chomhthimpeallach taobh thiar d'ábhar an leathanaigh. Beochan: sreabhann grádán radacha mór bog go mall trasna an doiciméid, ag athrú suímh agus déine i lúb fhada. Spreagthóir: ritheann go leanúnach ar gach leathanach. Teicneolaíocht: keyframe CSS amháin (body-glow-drift) ag beochan ciseal chúlra sheasta — nialas JavaScript. Cuspóir: atmaisféar agus doimhneacht a thabhairt don téama dorcha in ionad cúlra álainn.",
    },
  },
}

/** Route/nav label for the animations-reference hub — APP.animations. */
const APP_LABELS = {
  en: 'Animations Reference',
  br: 'Referência de Animações',
  es: 'Referencia de Animaciones',
  de: 'Animationsreferenz',
  hrk: 'Animatsione Referenz',
  cas: 'Referencia de Animaciones',
  riv: 'Referência de Animações',
  gn: 'Jeguama Momarandu',
  it: 'Riferimento delle Animazioni',
  ru: 'Справочник анимаций',
  fr: 'Référence des Animations',
  tln: 'Riferimento Animassion',
  gl: 'Referencia de Animacións',
  ca: "Referència d'Animacions",
  nl: 'Animatie-referentie',
  ga: 'Tagairt Beochana',
}

/** Hub page chrome — pages.animations.{title,description} per locale.
 *  `description` doubles as the page intro paragraph and the meta/SERP
 *  snippet, so it names exactly what the records carry. */
const PAGES = {
  en: {
    title: 'Animations Reference',
    description:
      'Every animation on the site, described — element, motion, trigger, technology and purpose — so readers, assistive tech and AI agents can inspect the full motion vocabulary.',
  },
  br: {
    title: 'Referência de Animações',
    description:
      'Todas as animações do site, descritas — elemento, movimento, gatilho, tecnologia e propósito — para leitores, tecnologias assistivas e agentes de IA.',
  },
  es: {
    title: 'Referencia de Animaciones',
    description:
      'Todas las animaciones del sitio, descritas — elemento, movimiento, disparador, tecnología y propósito — para lectores, tecnologías de asistencia y agentes de IA.',
  },
  de: {
    title: 'Animationsreferenz',
    description:
      'Alle Animationen der Website, beschrieben — Element, Bewegung, Auslöser, Technologie und Zweck — für Leser, assistive Technologien und KI-Agenten.',
  },
  hrk: {
    title: 'Animatsione Referenz',
    description:
      'Alle Animatsione vun de Seit, beschriwwe — Element, Bewegung, Auslöser, Technik un Zweck — fer Leser, assistive Technik un KI-Agente.',
  },
  cas: {
    title: 'Referencia de Animaciones',
    description:
      'Todas las animaciones del sitio, descritas — elemento, movimiento, disparador, tecnología y propósito — para lectores, tecnologías de asistencia y agentes de IA.',
  },
  riv: {
    title: 'Referência de Animações',
    description:
      'Todas as animações do site, descritas — elemento, movimento, gatilho, tecnologia e propósito — para leitores, tecnologias assistivas e agentes de IA.',
  },
  gn: {
    title: 'Jeguama Momarandu',
    description:
      "Opaite jeguama ko ñanduti roguépe, ojehai opavave — mba'e, jeguama, mo'ãha, tembiporu ha porupaha.",
  },
  it: {
    title: 'Riferimento delle Animazioni',
    description:
      'Tutte le animazioni del sito, descritte — elemento, movimento, attivazione, tecnologia e scopo — per lettori, tecnologie assistive e agenti IA.',
  },
  ru: {
    title: 'Справочник анимаций',
    description:
      'Все анимации сайта, описанные — элемент, движение, триггер, технология и назначение — для читателей, вспомогательных технологий и ИИ-агентов.',
  },
  fr: {
    title: 'Référence des Animations',
    description:
      "Toutes les animations du site, décrites — élément, mouvement, déclencheur, technologie et objectif — pour les lecteurs, les technologies d'assistance et les agents IA.",
  },
  tln: {
    title: 'Riferimento Animassion',
    description:
      'Tute le animazion del sito, descrite — elemento, movimento, ativazion, tecnologia e scopo — par letori, tecnologie assistive e agenti IA.',
  },
  gl: {
    title: 'Referencia de Animacións',
    description:
      'Todas as animacións do sitio, descritas — elemento, movemento, activador, tecnoloxía e propósito — para lectores, tecnoloxías de asistencia e axentes de IA.',
  },
  ca: {
    title: "Referència d'Animacions",
    description:
      "Totes les animacions del lloc, descrites — element, moviment, activador, tecnologia i propòsit — per a lectors, tecnologies d'assistència i agents d'IA.",
  },
  nl: {
    title: 'Animatie-referentie',
    description:
      'Alle animaties op de site, beschreven — element, beweging, trigger, technologie en doel — voor lezers, assistieve technologie en AI-agenten.',
  },
  ga: {
    title: 'Tagairt Beochana',
    description:
      'Gach beochan ar an suíomh, curtha síos — eilimint, gluaiseacht, spreagadh, teicneolaíocht agus cuspóir — do léitheoirí, do theicneolaíocht chuiditheach agus do ghníomhairí AI.',
  },
}
/** Per-locale slug for the animations-reference route — mirrors
 *  `LANG_SLUGS[loc].animations` in core/locale/lang-slugs.ts so the CMS
 *  slug-override table carries the full key set. */
const SLUGS = {
  en: 'animations',
  br: 'animacoes',
  es: 'animaciones',
  de: 'animationen',
  hrk: 'animatsione',
  cas: 'animaciones',
  riv: 'animacoes',
  gn: 'jeguama',
  it: 'animazioni',
  ru: 'animatsii',
  fr: 'animations',
  tln: 'animassion',
  gl: 'animacions',
  ca: 'animacions',
  nl: 'animaties',
  ga: 'beochan',
}

/** Sets `obj`'s leaf at a dot-path, creating intermediate containers. */
const setPath = (obj, dotPath, value) => {
  const keys = dotPath.split('.')
  const last = keys.pop()

  const node = keys.reduce((acc, k) => {
    if (acc[k] === undefined) acc[k] = {}
    return acc[k]
  }, obj)

  node[last] = value
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
let patched = 0

for (const [locale, animations] of Object.entries(DESCS)) {
  if (!db.translations?.[locale]) {
    console.warn(`skipping ${locale} — no translations node`)
    continue
  }

  // DESCS is the authoritative list — replacing the whole node drops
  // ids removed from the registry instead of leaving stale records.
  setPath(db.translations[locale], 'components.animations', animations)

  // Hub chrome — nav label + page node + slug-override default for the
  // animations-reference route.
  setPath(db.translations[locale], 'APP.animations', APP_LABELS[locale] || APP_LABELS.en)
  setPath(db.translations[locale], 'pages.animations', PAGES[locale] || PAGES.en)
  setPath(db.translations[locale], 'slugs.animations', SLUGS[locale] || SLUGS.en)

  for (const record of Object.values(animations)) {
    patched += Object.keys(record).length
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8')
console.log(
  `✅ database.json patched — ${patched} animation-description leaves across ${Object.keys(DESCS).length} locales.`
)

// ── Optional Firebase push ────────────────────────────────────────────────
if (process.argv.includes('--push')) {
  const keyPath = path.join(rootDir, '.firebase-admin-key.json')

  if (!fs.existsSync(keyPath)) {
    console.error(
      '⚠️  .firebase-admin-key.json missing — database.json written, Firebase push skipped'
    )
    process.exit(0)
  }

  const { default: admin } = await import('firebase-admin')

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(fs.readFileSync(keyPath, 'utf8'))),
    databaseURL: 'https://luiskr-com.firebaseio.com',
  })

  const rtdb = admin.database()

  for (const [locale, animations] of Object.entries(DESCS)) {
    await rtdb.ref(`translations/${locale}/components/animations`).set(animations)
    await rtdb.ref(`translations/${locale}/APP/animations`).set(APP_LABELS[locale] || APP_LABELS.en)
    await rtdb.ref(`translations/${locale}/pages/animations`).set(PAGES[locale] || PAGES.en)
    await rtdb.ref(`translations/${locale}/slugs/animations`).set(SLUGS[locale] || SLUGS.en)
    console.log(
      `🔥 pushed translations/${locale}/components/animations + APP/animations + pages/animations + slugs/animations`
    )
  }

  await admin.app().delete()
}
