# Ferramenta Certa

Jogo educativo para crianças do Ensino Fundamental, da área de **Computação**: na oficina do castor **Chico**, cada gaveta guarda ferramentas, e toda ferramenta tem uma função. A ideia que o jogo constrói aos poucos é que **o computador também é uma caixa de ferramentas**: cada parte faz uma coisa, e os programas e aplicativos também são ferramentas.

**Jogue em:** https://ferramenta-certa.cliick.dev

## Como funciona

A caixa de ferramentas do Chico tem **7 gavetas**, cada uma com 2 fases. Completar uma gaveta coloca uma ferramenta nova no cinto do Chico.

| # | Gaveta | Fases |
|---|--------|-------|
| 1 | Em casa | Memória (6 pares) · Qual ferramenta? |
| 2 | Na cozinha | Memória (6 pares) · Qual ferramenta? |
| 3 | Aparelhos | Memória (6 pares) · Qual ferramenta? |
| 4 | No computador | Memória (8 pares) · **Entrada ou saída?** (teclado manda para o computador; tela mostra para a gente) |
| 5 | Na internet | Memória (8 pares) · Qual ferramenta? (buscador, mapa, tradutor, calculadora, calendário, e-mail, previsão do tempo, editor, desenho, planilha) |
| 6 | Antes e depois | Memória (carta e e-mail, ábaco e calculadora, máquina de escrever e teclado...) · Qual veio antes? |
| 7 | A ferramenta certa | Desafio final misturando tudo · Monte a frase |

- **Memória**: vire uma carta amarela (a ferramenta) e uma azul (o que ela faz). Quando o par combina, a frase aparece: "A TESOURA corta o PAPEL". As cartas viram com animação e o jogo lembra, com uma dica, se a criança virar duas da mesma cor.
- **Qual ferramenta?**: uma situação do dia a dia e quatro ferramentas; só uma resolve.
- Ao final, um **diploma da oficina** com o nome da criança, pronto para imprimir.

São 42 pares de memória e 64 perguntas rápidas, pensados para 30 a 35 minutos de aula.

## Sem competição

Feito para turmas que incluem crianças com TEA. **Não há pontos, estrelas, tempo nem ranking.** Errar só mostra uma dica e deixa tentar de novo; cada acerto vem com uma explicação curta e um botão para seguir no próprio ritmo.

## Ajustes

- Sons (começam desligados) e animações (desligam sozinhas se o sistema pedir menos movimento).
- Modo turma, com letras maiores para projetar.
- Todas as gavetas abertas, para escolher qualquer fase fora da ordem.
- Nome do aprendiz e botão para recomeçar.

## Tecnologia

HTML, CSS e JavaScript puros, sem dependências. Funciona offline depois de carregado, no computador e no celular. O progresso fica salvo no navegador.

Arquivos: `index.html`, `estilo.css`, `jogo.js` (dados e fases), `icones.js` (ícones), `fontes/`.

## Créditos

Ícones [IconPark](https://github.com/bytedance/IconPark) (Apache-2.0), fontes Fredoka e Nunito (OFL). O Chico, a caixa de ferramentas e vários ícones são desenhos próprios. Detalhes em `CREDITOS.md`.
