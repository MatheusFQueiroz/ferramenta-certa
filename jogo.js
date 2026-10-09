'use strict';
/* Ferramenta Certa: a oficina do castor Chico. Sem pontos, vidas ou recordes.
   Ícones: icones.js (IconPark + desenhos próprios). */
var TINTA='#2F2A24';
var C={amarelo:'#F5A524',amareloEsc:'#C97F0E',azul:'#4DA3FF',verde:'#3BAA5A',coral:'#FF6B57',roxo:'#7C5CFF',madeira:'#8B5E3C',cinza:'#6B625A',rosa:'#E8486B',lima:'#8BC34A',marrom:'#B08968'};
function clareia(hex,t){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;r=Math.round(r+(255-r)*t);g=Math.round(g+(255-g)*t);b=Math.round(b+(255-b)*t);return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1);}
function icone(nome,cor,cor2){if(!ICONES[nome])nome='tool';var corpo=ICONES[nome].replace(/"#000"/g,'"'+TINTA+'"').replace(/#2F88FF/gi,cor||C.amarelo).replace(/#43CCF8/gi,cor2||clareia(cor||C.amarelo,.55));return '<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">'+corpo+'</svg>';}
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function $(id){return document.getElementById(id);}
function emb(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}

/* ---------------- estado ---------------- */
var CHAVE='ferramenta-certa-oficina';
var est={feitas:[],som:false,anim:!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches),livre:false,turma:false,nome:''};
try{var s=JSON.parse(localStorage.getItem(CHAVE)||'null');if(s)Object.keys(s).forEach(function(k){est[k]=s[k];});}catch(e){}
function salva(){try{localStorage.setItem(CHAVE,JSON.stringify(est));}catch(e){}}
function aplicaAjustes(){document.body.classList.toggle('sem-animacao',!est.anim);document.body.classList.toggle('turma',!!est.turma);}
aplicaAjustes();

/* ---------------- sons e voz (só quando ligados) ---------------- */
var ctx;
function tom(freqs){if(!est.som)return;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();freqs.forEach(function(f,i){var o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+i*.12;o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.4);});}catch(e){}}
var SOM={certo:[523,659,784],quase:[330,294],fim:[523,659,784,1047],clique:[440],vira:[392]};
function fala(t){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(String(t).replace(/<[^>]+>/g,''));u.lang='pt-BR';u.rate=.9;speechSynthesis.speak(u);}catch(e){}}
function confete(){if(!est.anim)return;var cores=[C.amarelo,C.azul,C.verde,C.coral,C.roxo,C.madeira];for(var i=0;i<28;i++){var c=el('div','confete');c.style.left=(Math.random()*100)+'vw';c.style.background=cores[i%6];c.style.borderRadius=i%3===0?'50%':'3px';c.style.setProperty('--dx',(Math.random()*160-80)+'px');c.style.setProperty('--giro',(Math.random()*720-360)+'deg');c.style.setProperty('--dur',(2.4+Math.random()*1.4)+'s');c.style.setProperty('--atraso',(Math.random()*.5)+'s');document.body.appendChild(c);setTimeout(c.remove.bind(c),4600);}}

/* ---------------- Chico, o castor ---------------- */
function chico(cls){return '<svg class="chico '+(cls||'')+'" viewBox="0 0 120 110" aria-hidden="true">'+
 '<ellipse cx="60" cy="103" rx="40" ry="6" fill="rgba(47,42,36,.12)"/>'+
 '<g class="c-cauda"><path d="M78 86q26-6 30 8-6 10-32 2Z" fill="#6B4426" stroke="'+TINTA+'" stroke-width="3" stroke-linejoin="round"/><path d="M86 88l14 2M86 94l16-1" stroke="#4A2E18" stroke-width="2" opacity=".6"/></g>'+
 '<g class="c-corpo">'+
 '<ellipse cx="58" cy="76" rx="34" ry="26" fill="#A9754C" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<ellipse cx="58" cy="80" rx="20" ry="16" fill="#D9B991"/>'+
 '<rect x="30" y="84" width="14" height="16" rx="6" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/><rect x="72" y="84" width="14" height="16" rx="6" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<rect x="26" y="68" width="64" height="12" rx="6" fill="#6B4426" stroke="'+TINTA+'" stroke-width="3"/><rect x="52" y="66" width="12" height="16" rx="3" fill="#F5A524" stroke="'+TINTA+'" stroke-width="2.5"/>'+
 '<rect x="34" y="70" width="8" height="12" rx="2" fill="#4DA3FF" stroke="'+TINTA+'" stroke-width="2"/><rect x="74" y="70" width="8" height="12" rx="2" fill="#FF6B57" stroke="'+TINTA+'" stroke-width="2"/>'+
 '<circle cx="36" cy="32" r="8" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/><circle cx="84" cy="32" r="8" fill="#8B5E3C" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<path d="M30 44q0-24 30-24t30 24v10q0 18-30 18T30 54Z" fill="#B8865B" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<ellipse cx="60" cy="56" rx="18" ry="12" fill="#E8D1B0" stroke="'+TINTA+'" stroke-width="3"/>'+
 '<ellipse cx="60" cy="48" rx="6" ry="4.5" fill="'+TINTA+'"/>'+
 '<rect x="54" y="58" width="6" height="8" rx="1.5" fill="#fff" stroke="'+TINTA+'" stroke-width="2"/><rect x="60" y="58" width="6" height="8" rx="1.5" fill="#fff" stroke="'+TINTA+'" stroke-width="2"/>'+
 '<g class="c-olhos"><circle cx="48" cy="40" r="4" fill="'+TINTA+'"/><circle cx="72" cy="40" r="4" fill="'+TINTA+'"/><circle cx="49.5" cy="38.5" r="1.3" fill="#fff"/><circle cx="73.5" cy="38.5" r="1.3" fill="#fff"/></g>'+
 '<path d="M28 26q4-16 32-16t32 16Z" fill="#F5A524" stroke="'+TINTA+'" stroke-width="3" stroke-linejoin="round"/><rect x="22" y="24" width="76" height="8" rx="4" fill="#F5A524" stroke="'+TINTA+'" stroke-width="3"/><path d="M60 11v13" stroke="'+TINTA+'" stroke-width="2.5"/>'+
 '</g></svg>';}
function balaoChico(titulo,texto,cls,extra){return '<div class="fala">'+chico(cls)+'<div class="balao">'+(titulo?'<b>'+titulo+'</b>':'')+texto+(extra||'')+'</div></div>';}

/* ======================================================================
   FERRAMENTAS (id → [ícone, nome])
   ====================================================================== */
var FER={
 tesoura:['scissors','Tesoura'],chave:['key','Chave'],guardachuva:['umbrella','Guarda-chuva'],picareta:['picareta','Picareta'],vassoura:['vassoura','Vassoura'],sabonete:['sabonete','Sabonete'],martelo:['martelo','Martelo'],regador:['regador','Regador'],escova:['escova','Escova de dentes'],
 panela:['cooking-pot','Panela'],chaleira:['kettle','Chaleira'],geladeira:['refrigerator','Geladeira'],talheres:['knife-fork','Talheres'],fogao:['fogao','Fogão'],copo:['cup','Copo'],
 lanterna:['flashlight','Lanterna'],despertador:['alarm-clock','Despertador'],fone:['headset-one','Fone de ouvido'],telefone:['phone-telephone','Telefone'],camera:['camera','Câmera'],termometro:['thermometer','Termômetro'],ventilador:['ventilador','Ventilador'],controle:['remote-control','Controle remoto'],lampada:['lampada','Lâmpada'],ferro:['iron','Ferro de passar'],
 teclado:['keyboard','Teclado'],mouse:['mouse','Mouse'],impressora:['printer','Impressora'],microfone:['microphone','Microfone'],tela:['monitor','Tela'],celular:['iphone','Celular'],caixasom:['speaker','Caixa de som'],webcam:['camera-one','Webcam'],joystick:['controle','Controle de videogame'],projetor:['projector','Projetor'],
 buscador:['search','Buscador'],mapa:['map-draw','Mapa no celular'],tradutor:['translate','Tradutor'],calculadora:['calculator','Calculadora'],calendario:['calendar','Calendário'],email:['mail','E-mail'],previsao:['cloudy','Previsão do tempo'],desenho:['platte','Programa de desenho'],editor:['edit','Editor de texto'],planilha:['table','Planilha'],
 carta:['envelope','Carta'],gps:['navigation','GPS'],enciclopedia:['bookshelf','Enciclopédia'],maquina:['maquina-escrever','Máquina de escrever'],abaco:['abaco','Ábaco'],fixo:['phone-telephone','Telefone fixo'],quadro:['quadro-giz','Quadro de giz'],radio:['radio','Rádio']
};
function nomeFer(id){return FER[id][1];}
function icFer(id,cor){return icone(FER[id][0],cor||C.amarelo);}

/* pares da memória: [ferramenta, ícone da função, nome da função, frase] */
var PARES={
 casa:[['tesoura','file-text','Papel','A <b>TESOURA</b> corta o <b>PAPEL</b>.'],['chave','porta','Porta','A <b>CHAVE</b> abre a <b>PORTA</b>.'],['guardachuva','heavy-rain','Chuva','O <b>GUARDA-CHUVA</b> protege da <b>CHUVA</b>.'],['picareta','diamond','Diamante','A <b>PICARETA</b> cava até o <b>DIAMANTE</b>.'],['vassoura','leaves','Folhas','A <b>VASSOURA</b> varre as <b>FOLHAS</b>.'],['sabonete','maos','Mãos','O <b>SABONETE</b> limpa as <b>MÃOS</b>.']],
 cozinha:[['panela','sopa','Sopa','A <b>PANELA</b> cozinha a <b>SOPA</b>.'],['chaleira','cha','Chá','A <b>CHALEIRA</b> esquenta a água do <b>CHÁ</b>.'],['geladeira','leite','Leite gelado','A <b>GELADEIRA</b> gela o <b>LEITE</b>.'],['talheres','bowl','Comida','Os <b>TALHERES</b> levam a <b>COMIDA</b> até a boca.'],['fogao','fogo','Fogo','O <b>FOGÃO</b> acende o <b>FOGO</b> para cozinhar.'],['copo','water','Água','O <b>COPO</b> guarda a <b>ÁGUA</b> para beber.']],
 aparelhos:[['lanterna','moon','Escuro','A <b>LANTERNA</b> ilumina o <b>ESCURO</b>.'],['despertador','cama','Quem dorme','O <b>DESPERTADOR</b> acorda quem <b>DORME</b>.'],['fone','music','Música','O <b>FONE</b> deixa ouvir <b>MÚSICA</b>.'],['telefone','vovo','Vovó','O <b>TELEFONE</b> fala com a <b>VOVÓ</b> que mora longe.'],['camera','picture','Foto','A <b>CÂMERA</b> tira <b>FOTO</b>.'],['termometro','febre','Febre','O <b>TERMÔMETRO</b> mede a <b>FEBRE</b>.']],
 computador:[['teclado','text','Letras','O <b>TECLADO</b> escreve as <b>LETRAS</b>.'],['mouse','click','Clique','O <b>MOUSE</b> aponta e <b>CLICA</b>.'],['impressora','file-text','Papel','A <b>IMPRESSORA</b> põe no <b>PAPEL</b>.'],['microfone','voice','Voz','O <b>MICROFONE</b> escuta a <b>VOZ</b>.'],['tela','eyes','Ver','A <b>TELA</b> mostra tudo para a gente <b>VER</b>.'],['celular','message','Mensagem','O <b>CELULAR</b> manda <b>MENSAGEM</b>.'],['caixasom','sound','Som','A <b>CAIXA DE SOM</b> toca o <b>SOM</b>.'],['webcam','video','Vídeo','A <b>WEBCAM</b> faz a chamada de <b>VÍDEO</b>.']],
 internet:[['buscador','book-open','Informação','O <b>BUSCADOR</b> encontra <b>INFORMAÇÃO</b>.'],['mapa','navigation','Caminho','O <b>MAPA</b> mostra o <b>CAMINHO</b>.'],['tradutor','earth','Outra língua','O <b>TRADUTOR</b> explica <b>OUTRA LÍNGUA</b>.'],['calculadora','plus','Contas','A <b>CALCULADORA</b> faz as <b>CONTAS</b>.'],['calendario','cake','Aniversário','O <b>CALENDÁRIO</b> lembra o <b>ANIVERSÁRIO</b>.'],['email','send','Mensagem longe','O <b>E-MAIL</b> manda <b>MENSAGEM</b> para longe.'],['previsao','umbrella','Guarda-chuva','A <b>PREVISÃO DO TEMPO</b> avisa se precisa de <b>GUARDA-CHUVA</b>.'],['desenho','picture','Desenho','O <b>PROGRAMA DE DESENHO</b> faz o <b>DESENHO</b> no computador.']],
 tempo:[['carta','mail','E-mail','Antes, a <b>CARTA</b> demorava dias. Hoje o <b>E-MAIL</b> chega em segundos.'],['mapa','navigation','GPS','Antes, o <b>MAPA DE PAPEL</b>. Hoje o <b>GPS</b> fala o caminho.'],['enciclopedia','search','Buscador','Antes, a <b>ENCICLOPÉDIA</b> na estante. Hoje o <b>BUSCADOR</b> na internet.'],['maquina','keyboard','Teclado','Antes, a <b>MÁQUINA DE ESCREVER</b>. Hoje o <b>TECLADO</b> do computador.'],['abaco','calculator','Calculadora','Antes, o <b>ÁBACO</b>. Hoje a <b>CALCULADORA</b>.'],['fixo','iphone','Celular','Antes, o <b>TELEFONE FIXO</b> preso na parede. Hoje o <b>CELULAR</b> no bolso.'],['quadro','projector','Projetor','Antes, só o <b>QUADRO DE GIZ</b>. Hoje também o <b>PROJETOR</b>.'],['radio','headset-one','Fone','Antes, a música no <b>RÁDIO</b>. Hoje no <b>FONE</b>, pelo celular.']]
};
/* Qual ferramenta? [situação, ícone da situação, resposta, opções, explicação] */
var QUAL={
 casa:[['Preciso cortar um papel.','file-text','tesoura',['tesoura','martelo','vassoura','chave'],'A tesoura corta papel. Martelo é para pregar, vassoura é para varrer.'],['A porta está trancada.','porta','chave',['chave','sabonete','picareta','regador'],'A chave abre a porta.'],['Começou a chover e eu vou sair.','heavy-rain','guardachuva',['guardachuva','vassoura','lanterna','escova'],'O guarda-chuva protege da chuva.'],['O chão ficou cheio de folhas.','leaves','vassoura',['vassoura','tesoura','copo','martelo'],'A vassoura varre as folhas.'],['Minhas mãos estão sujas de terra.','maos','sabonete',['sabonete','chave','picareta','ferro'],'O sabonete limpa as mãos.'],['Quero pendurar um quadro na parede.','picture','martelo',['martelo','tesoura','guardachuva','sabonete'],'O martelo bate o prego na parede.'],['A plantinha está com sede.','seedling','regador',['regador','vassoura','chave','lanterna'],'O regador molha a planta.']],
 cozinha:[['Quero esquentar a água do chá.','cha','chaleira',['chaleira','geladeira','copo','vassoura'],'A chaleira esquenta a água.'],['O suco precisa ficar gelado.','leite','geladeira',['geladeira','fogao','panela','martelo'],'A geladeira gela as bebidas.'],['Vamos fazer uma sopa.','sopa','panela',['panela','copo','tesoura','ferro'],'A sopa cozinha na panela.'],['Hora de comer o macarrão.','bowl','talheres',['talheres','chave','regador','lanterna'],'Garfo e faca levam a comida até a boca.'],['Estou com sede.','water','copo',['copo','panela','vassoura','escova'],'O copo guarda a água para beber.'],['Terminei o almoço e vou escovar os dentes.','escova','escova',['escova','sabonete','talheres','chaleira'],'A escova limpa os dentes depois das refeições.']],
 aparelhos:[['Preciso acordar cedo amanhã.','cama','despertador',['despertador','lanterna','camera','ferro'],'O despertador toca na hora certa.'],['Está escuro no quintal.','moon','lanterna',['lanterna','fone','termometro','controle'],'A lanterna ilumina o escuro.'],['Quero ouvir música sem incomodar ninguém.','music','fone',['fone','telefone','ventilador','camera'],'O fone deixa a música só para você.'],['Quero falar com a vovó que mora longe.','vovo','telefone',['telefone','despertador','lanterna','lampada'],'O telefone leva a sua voz até longe.'],['Quero guardar uma lembrança do passeio.','picture','camera',['camera','termometro','ferro','controle'],'A câmera tira a foto.'],['Acho que estou com febre.','febre','termometro',['termometro','fone','camera','despertador'],'O termômetro mede a temperatura.'],['Está muito calor no quarto.','sun','ventilador',['ventilador','lampada','telefone','termometro'],'O ventilador faz vento.'],['Quero trocar o canal da TV sem levantar.','tv','controle',['controle','camera','fone','lanterna'],'O controle remoto manda o comando para a TV.']],
 internet:[['Quero saber qual é o maior animal do mundo.','book-open','buscador',['buscador','calculadora','previsao','desenho'],'O buscador procura a informação na internet. Depois, confira a fonte!'],['Como chegar até a biblioteca?','navigation','mapa',['mapa','email','tradutor','planilha'],'O mapa mostra o caminho.'],['Não entendi uma palavra em inglês.','earth','tradutor',['tradutor','calendario','buscador','editor'],'O tradutor explica a palavra em outra língua.'],['Quanto custam três lanches de 7 reais?','plus','calculadora',['calculadora','desenho','mapa','previsao'],'A calculadora faz a conta: 3 vezes 7.'],['Não posso esquecer o dia da prova.','cake','calendario',['calendario','tradutor','email','buscador'],'O calendário guarda a data e avisa.'],['Quero mandar um recado para a professora.','send','email',['email','calculadora','desenho','mapa'],'O e-mail leva a mensagem.'],['Será que amanhã vai chover?','umbrella','previsao',['previsao','editor','planilha','calculadora'],'A previsão do tempo avisa.'],['Vou escrever a minha redação no computador.','text','editor',['editor','desenho','mapa','previsao'],'O editor de texto é para escrever.'],['Quero fazer um desenho colorido no computador.','picture','desenho',['desenho','planilha','tradutor','email'],'O programa de desenho é para pintar.'],['Preciso organizar os gastos da festa em linhas e colunas.','table','planilha',['planilha','desenho','buscador','mapa'],'A planilha organiza números em tabela.']],
 final:[['Cortar um papel.','file-text','tesoura',['tesoura','calculadora','panela','lanterna'],'Tesoura: ferramenta de casa.'],['Fazer as contas da compra.','plus','calculadora',['calculadora','tesoura','vassoura','telefone'],'Calculadora: ferramenta de número.'],['Escrever uma história no computador.','text','teclado',['teclado','caixasom','guardachuva','regador'],'Teclado: por ele as letras entram no computador.'],['Ouvir o som do vídeo.','sound','caixasom',['caixasom','microfone','chave','mapa'],'Caixa de som: por ela o som sai do computador.'],['Achar o caminho até o parque.','navigation','mapa',['mapa','ferro','teclado','copo'],'Mapa: ferramenta de caminho.'],['Gravar a minha voz para um podcast.','voice','microfone',['microfone','impressora','vassoura','despertador'],'Microfone: por ele a voz entra no computador.'],['Esquentar a água do chá.','cha','chaleira',['chaleira','tradutor','mouse','camera'],'Chaleira: ferramenta da cozinha.'],['Imprimir o cartaz no papel.','file-text','impressora',['impressora','tela','panela','fone'],'Impressora: por ela o trabalho sai no papel.'],['Saber se precisa de casaco amanhã.','umbrella','previsao',['previsao','martelo','webcam','copo'],'Previsão do tempo: ferramenta de informação.'],['Clicar no botão da tela.','click','mouse',['mouse','sabonete','email','termometro'],'Mouse: ferramenta de apontar e clicar.'],['Conversar com a vovó vendo o rosto dela.','video','webcam',['webcam','picareta','calendario','fogao'],'Webcam: ferramenta de chamada de vídeo.'],['Lembrar o aniversário do amigo.','cake','calendario',['calendario','tesoura','lanterna','caixasom'],'Calendário: ferramenta de datas.']]
};
/* Entrada ou saída: [ferramenta, 'E'|'S', explicação] */
var ES=[['teclado','E','O teclado manda as letras PARA o computador. É entrada.'],['tela','S','A tela mostra o que o computador fez PARA a gente. É saída.'],['mouse','E','O mouse manda o clique PARA o computador. É entrada.'],['impressora','S','A impressora entrega o trabalho no papel. É saída.'],['microfone','E','O microfone manda a sua voz PARA o computador. É entrada.'],['caixasom','S','A caixa de som toca o som que o computador manda. É saída.'],['webcam','E','A webcam manda a imagem PARA o computador. É entrada.'],['fone','S','O fone toca o som que sai do computador. É saída.'],['joystick','E','O controle manda os comandos PARA o jogo. É entrada.'],['projetor','S','O projetor joga na parede o que o computador mostra. É saída.']];
/* Qual veio antes? [antigo, novo, explicação] */
var ANTES=[['carta','email','A carta veio antes. O e-mail faz o mesmo trabalho em segundos.'],['mapa','gps','O mapa de papel veio antes. O GPS mostra onde você está agora.'],['enciclopedia','buscador','A enciclopédia veio antes. O buscador procura em milhões de páginas.'],['maquina','teclado','A máquina de escrever veio antes. O teclado deixa apagar e corrigir.'],['abaco','calculadora','O ábaco veio antes, há milhares de anos. A calculadora é muito mais rápida.'],['fixo','celular','O telefone fixo veio antes, preso na parede. O celular vai no bolso.'],['quadro','projetor','O quadro de giz veio antes. O projetor mostra imagens e vídeos.'],['radio','fone','O rádio veio antes. Hoje a música toca no fone, pelo celular.']];
/* Monte a frase: [ferramenta, função certa, duas erradas] */
var FRASES=[['lanterna','iluminar o escuro','acordar quem dorme','gelar o leite'],['despertador','acordar quem dorme','cortar papel','tirar foto'],['geladeira','gelar a comida e a bebida','escrever letras','varrer folhas'],['impressora','colocar o trabalho no papel','abrir a porta','esquentar a água'],['buscador','encontrar informação na internet','medir a febre','fazer vento'],['tradutor','explicar palavras de outra língua','varrer o chão','tocar música'],['microfone','levar a voz para o computador','proteger da chuva','mostrar o caminho'],['guardachuva','proteger da chuva','fazer contas','mandar mensagem']];

/* ======================================================================
   GAVETAS (mundos) e fases
   ====================================================================== */
var MUNDOS=[
 {id:'casa',nome:'Em casa',cor:C.amarelo,ic:'home',desc:'Tesoura, chave, guarda-chuva... cada coisa tem a sua função.',intro:'Cada ferramenta foi inventada para fazer uma coisa bem. Vamos descobrir o que cada uma faz!',fases:[{tipo:'memoria',pares:PARES.casa,nome:'Memória'},{tipo:'qual',itens:QUAL.casa,nome:'Qual ferramenta?'}]},
 {id:'cozinha',nome:'Na cozinha',cor:C.coral,ic:'knife-fork',desc:'Panela, chaleira, geladeira: as ferramentas da comida.',intro:'A cozinha é uma oficina de comida. Cada aparelho ajuda de um jeito.',fases:[{tipo:'memoria',pares:PARES.cozinha,nome:'Memória'},{tipo:'qual',itens:QUAL.cozinha,nome:'Qual ferramenta?'}]},
 {id:'aparelhos',nome:'Aparelhos',cor:C.azul,ic:'flashlight',desc:'Lanterna, despertador, telefone: ferramentas com botão.',intro:'Aparelhos são ferramentas que usam energia. Eles também servem para uma coisa cada.',fases:[{tipo:'memoria',pares:PARES.aparelhos,nome:'Memória'},{tipo:'qual',itens:QUAL.aparelhos,nome:'Qual ferramenta?'}]},
 {id:'computador',nome:'No computador',cor:C.roxo,ic:'computer',desc:'Teclado, mouse, tela: o computador é uma caixa de ferramentas.',intro:'O computador é uma caixa de ferramentas: cada parte faz uma coisa. Umas mandam informação PARA ele, outras mostram o que ele fez.',fases:[{tipo:'memoria',pares:PARES.computador,nome:'Memória'},{tipo:'es',itens:ES,nome:'Entrada ou saída?'}]},
 {id:'internet',nome:'Na internet',cor:C.verde,ic:'earth',desc:'Buscador, mapa, tradutor: ferramentas que são programas.',intro:'Na internet as ferramentas são programas e aplicativos. Cada um resolve um tipo de problema.',fases:[{tipo:'memoria',pares:PARES.internet,nome:'Memória'},{tipo:'qual',itens:QUAL.internet,nome:'Qual ferramenta?'}]},
 {id:'tempo',nome:'Antes e depois',cor:C.marrom,ic:'history',desc:'Carta e e-mail, ábaco e calculadora: as ferramentas mudam.',intro:'As ferramentas mudam com o tempo, mas o trabalho continua o mesmo: mandar recado, fazer conta, achar o caminho.',fases:[{tipo:'memoria',pares:PARES.tempo,nome:'Antes e depois',antes:true},{tipo:'antes',itens:ANTES,nome:'Qual veio antes?'}]},
 {id:'oficina',nome:'A ferramenta certa',cor:C.rosa,ic:'tool',desc:'O desafio final: misturando tudo.',intro:'Agora tudo junto: ferramentas de casa, da cozinha, do computador e da internet. Qual é a certa para cada trabalho?',fases:[{tipo:'qual',itens:QUAL.final,nome:'Desafio final'},{tipo:'frase',itens:FRASES,nome:'Monte a frase'}]}
];
var FASES=[];MUNDOS.forEach(function(m,mi){m.fases.forEach(function(f,fi){f.m=mi;f.i=fi;FASES.push(f);});});
function nItens(F){return F.tipo==='memoria'?F.pares.length:F.itens.length;}
function aberta(i){return est.livre||i===0||est.feitas.indexOf(i-1)>=0;}
function feita(i){return est.feitas.indexOf(i)>=0;}
function proxima(){for(var i=0;i<FASES.length;i++)if(!feita(i))return i;return -1;}
function mundoCompleto(m){return m.fases.every(function(f){return feita(FASES.indexOf(f));});}
function todas(){return proxima()<0;}

/* ======================================================================
   NAVEGAÇÃO
   ====================================================================== */
function mostra(id){['mapa','jogo','ajustes'].forEach(function(t){var e=$(t);e.classList.toggle('oculto',t!==id);if(t===id){e.classList.remove('entra');void e.offsetWidth;e.classList.add('entra');}});
 ['Mapa','Ajustes'].forEach(function(n){$('bt'+n).classList.toggle('ativo',n.toLowerCase()===id);});
 if(id==='mapa')telaMapa();if(id==='ajustes')telaAjustes();
 window.scrollTo({top:0,behavior:est.anim?'smooth':'auto'});
}
function janela(html,cls){var j=$('janela');j.innerHTML='';var cx=el('div','cartao '+(cls||''),html);j.appendChild(cx);j.classList.remove('oculto');return cx;}
function fechaJanela(){$('janela').classList.add('oculto');}

function cinto(){var h='<div class="cinto">';MUNDOS.forEach(function(m,mi){var ok=mundoCompleto(m);h+='<span class="'+(ok?'':'vazio')+'" title="'+m.nome+'" style="animation-delay:'+(mi*.05)+'s">'+(ok?icone(m.ic,m.cor):'')+'</span>';});return h+'</div>';}
function telaMapa(){
 var t=$('mapa');t.innerHTML='';
 var p=proxima(),n=est.feitas.length,fim=p<0;
 var txt=fim?'Você abriu todas as gavetas e conhece a função de cada ferramenta. O seu diploma da oficina está pronto!':(n===0?'Sou o Chico, e esta é a minha oficina. Cada gaveta guarda ferramentas, e cada ferramenta faz uma coisa. Abra a gaveta que está brilhando.':'A gaveta que brilha é a próxima. Já tem '+n+(n===1?' fase feita':' fases feitas')+'. Pode repetir qualquer gaveta aberta também.');
 t.appendChild(el('div',null,balaoChico(fim?'Oficina completa!':'Olá, '+(est.nome||'aprendiz')+'!',txt,null,'<small style="display:block;margin-top:8px;color:var(--tinta-2);font-size:13px">Meu cinto de ferramentas: uma por gaveta completa</small>'+cinto())));
 var caixa=el('div','caixa');caixa.innerHTML='<div class="caixa-topo">'+icone('tool','#FFF4E0','#FFD27A')+'Caixa de ferramentas do Chico</div>';
 var g=el('div','gavetas');
 MUNDOS.forEach(function(m,mi){
  var completa=mundoCompleto(m),temAberta=m.fases.some(function(f){return aberta(FASES.indexOf(f));}),atual=m.fases.some(function(f){return FASES.indexOf(f)===p;});
  var gv=el('div','gaveta'+(completa?' completa':'')+(!temAberta?' fechada':'')+(atual?' atual':''));gv.style.setProperty('--cor',m.cor);gv.style.animationDelay=(mi*.06)+'s';
  gv.innerHTML='<span class="alca"></span><div class="cab"><div class="ic">'+icone(m.ic,'#fff',clareia(m.cor,.2))+'</div><div><h2>'+m.nome+'</h2><small>Gaveta '+(mi+1)+' · '+m.fases.length+' fases</small></div></div><p>'+m.desc+'</p>';
  var ps=el('div','parafusos');
  m.fases.forEach(function(f,fi){var gi=FASES.indexOf(f),b=el('button','parafuso'+(feita(gi)?' feita':!aberta(gi)?' fechada':gi===p?' atual':''));
   b.innerHTML=feita(gi)?icone('check-one','#fff'):String(fi+1);b.setAttribute('aria-label','Gaveta '+(mi+1)+', fase '+(fi+1)+': '+f.nome+(feita(gi)?' (feita)':!aberta(gi)?' (fechada)':''));b.title=f.nome;
   b.onclick=function(){if(!aberta(gi)){avisoRapido(b,'Primeiro complete a fase anterior.');return;}tom(SOM.clique);abreFase(gi);};ps.appendChild(b);
   ps.appendChild(el('span','rot',f.nome));});
  gv.appendChild(ps);
  if(completa)gv.appendChild(el('span','selo',icone('check-one','#fff')+'Completa'));
  g.appendChild(gv);
 });
 caixa.appendChild(g);t.appendChild(caixa);
 t.appendChild(el('div','legenda-mapa','<span><i class="a"></i>Próxima fase</span><span><i class="f"></i>Feita</span><span><i class="x"></i>Ainda fechada</span>'));
 var bts=el('div','linha-bts');
 if(fim){var bc=el('button','bt-principal',icone('certificate',TINTA)+'Ver meu diploma');bc.onclick=abreDiploma;bts.appendChild(bc);}
 else{var bp=el('button','bt-principal',icone('tool',TINTA)+'Abrir: '+MUNDOS[FASES[p].m].nome+' · '+FASES[p].nome);bp.onclick=function(){abreFase(p);};bts.appendChild(bp);}
 t.appendChild(bts);
}
function avisoRapido(b,t){b.classList.remove('treme');void b.offsetWidth;b.classList.add('treme');var av=el('div','aviso-caixa',t);av.style.position='fixed';av.style.left='50%';av.style.bottom='24px';av.style.transform='translateX(-50%)';av.style.zIndex=40;document.body.appendChild(av);setTimeout(function(){av.remove();},1800);}

/* ======================================================================
   JOGO: estrutura comum
   ====================================================================== */
var J={};
function abreFase(i){
 var F=FASES[i],M=MUNDOS[F.m];J={i:i,F:F,M:M,k:0};
 mostra('jogo');
 $('chipGaveta').innerHTML=icone(M.ic,M.cor)+'Gaveta '+(F.m+1)+': '+M.nome+' · '+F.nome;
 $('btOuvir').innerHTML=icone('volume-up',C.azul);$('btVoltar').innerHTML=icone('arrow-left','#fff')+'Oficina';
 desenhaPrevia();
 var palco=$('palco');palco.innerHTML='';$('aviso').innerHTML='';
 var como={memoria:F.antes?'Vire uma carta <b>amarela</b> (a ferramenta de antes) e uma <b>azul</b> (a de hoje) que fazem o mesmo trabalho.':'Vire uma carta <b>amarela</b> (a ferramenta) e uma <b>azul</b> (o que ela faz). Quando o par combina, as duas ficam viradas.',qual:'Leia a situação e toque na ferramenta certa.',es:'Cada parte do computador é <b>entrada</b> (manda informação para o computador) ou <b>saída</b> (o computador mostra para a gente). Qual é?',antes:'Duas ferramentas que fazem o mesmo trabalho. Toque na que veio <b>antes</b>.',frase:'Complete a frase: para que serve a ferramenta?'}[F.tipo];
 palco.appendChild(el('div',null,balaoChico(F.i===0?M.nome:F.nome,(F.i===0?M.intro+' ':'')+como,'pensando')));
 var bt=el('button','bt-principal',icone('tool',TINTA)+'Começar');bt.onclick=function(){tom(SOM.clique);J.k=0;desenhaPrevia();({memoria:jogoMemoria,qual:jogoQual,es:jogoES,antes:jogoAntes,frase:jogoFrase})[F.tipo]();};
 palco.appendChild(el('div','linha-bts')).appendChild(bt);
 J.textoOuvir=(F.i===0?M.intro+' ':'')+como;
 setTimeout(function(){bt.focus({preventScroll:true});},60);
}
function desenhaPrevia(){var pv=$('previa');pv.innerHTML='';var n=nItens(J.F);for(var i=0;i<n;i++){var d=el('i');if(i<J.k)d.className='f';else if(i===J.k)d.className='a';pv.appendChild(d);}}
function avisa(html,bom,btTxt,fn){var a=$('aviso');a.innerHTML='';var cx=el('div','aviso-caixa'+(bom?' bom':''),html);if(btTxt){var b=el('button','bt-principal verde',icone('right','#fff')+btTxt);b.style.margin='10px auto 0';b.style.height='52px';b.style.fontSize='18px';b.onclick=fn;cx.appendChild(b);}a.appendChild(cx);if(btTxt)setTimeout(function(){b.focus({preventScroll:true});},50);}
function erro(elm,txt){tom(SOM.quase);elm.classList.remove('treme');void elm.offsetWidth;elm.classList.add('treme');avisa(txt);}
function marcaCerta(b,ops){ops.classList.add('travada');tom(SOM.certo);b.classList.add('certa');b.appendChild(el('span','ok-op',icone('check-one',C.verde)));ops.querySelectorAll('.opcao').forEach(function(x){if(x!==b)x.classList.add('fora');});}
function concluiFase(extraHtml){
 var F=J.F,M=J.M;if(!feita(J.i)){est.feitas.push(J.i);salva();}
 tom(SOM.fim);confete();
 var j=$('premio');j.innerHTML='';
 var fim=todas(),completou=mundoCompleto(M),ult=J.i===FASES.length-1;
 var tit=completou?'Gaveta completa!':'Fase completa!';
 var sub=fim?'Você abriu todas as gavetas da oficina. Seu diploma está pronto!':completou?'O Chico ganhou mais uma ferramenta no cinto: '+M.nome+'.':'Falta a fase "'+M.fases[F.i+1].nome+'" para fechar esta gaveta.';
 var cx=el('div','cartao','<div class="kick">Gaveta '+(F.m+1)+' · '+F.nome+'</div><div class="carimbo-c" style="--cor-selo:'+M.cor+'">'+icone(M.ic,M.cor)+'</div><h2>'+tit+'</h2><p class="sub">'+sub+'</p>'+(extraHtml||''));
 cx.style.setProperty('--cor-selo',M.cor);
 var bt=el('button','bt-principal',icone(fim?'certificate':'right',TINTA)+(fim?'Ver o diploma':ult?'Voltar à oficina':'Continuar'));
 bt.onclick=function(){j.classList.add('oculto');if(fim){mostra('mapa');setTimeout(abreDiploma,800);}else if(ult)mostra('mapa');else abreFase(J.i+1);};cx.appendChild(bt);
 var bm=el('button','bt-leve',icone('home',C.madeira)+'Oficina');bm.onclick=function(){j.classList.add('oculto');mostra('mapa');};cx.appendChild(bm);
 j.appendChild(cx);j.classList.remove('oculto');setTimeout(function(){bt.focus();},100);
}

/* ---------- Memória: ferramenta ↔ função ---------- */
function jogoMemoria(){
 var F=J.F,pares=F.pares,palco=$('palco');palco.innerHTML='';$('aviso').innerHTML='';
 palco.appendChild(el('div','pista',F.antes?'Vire uma <span class="qa">AMARELA</span> (antes) e uma <span class="qz">AZUL</span> (hoje) que fazem o mesmo trabalho':'Vire uma <span class="qa">AMARELA</span> (a ferramenta) e uma <span class="qz">AZUL</span> (o que ela faz)'));
 var frase=el('div','frase vazia','Quando um par combinar, a frase aparece aqui.');palco.appendChild(frase);
 var cartas=[];pares.forEach(function(p,i){cartas.push({par:i,t:'fer',ic:FER[p[0]][0],nome:FER[p[0]][1]});cartas.push({par:i,t:'fun',ic:p[1],nome:p[2]});});
 var g=el('div','grade '+(cartas.length>12?'g16':'g12'));var abertas=[],trava=false,achados=0;
 emb(cartas).forEach(function(c,n){
  var b=el('button','carta '+c.t);b.style.animationDelay=(n*.03)+'s';b.setAttribute('aria-label',c.t==='fer'?'Carta amarela':'Carta azul');
  b.innerHTML='<div class="face verso">'+icone(c.t==='fer'?'spanner':'light',c.t==='fer'?'#5A3A00':'#fff')+'<small>'+(c.t==='fer'?(F.antes?'ANTES':'FERRAMENTA'):(F.antes?'HOJE':'O QUE FAZ'))+'</small></div><div class="face frente">'+icone(c.ic,c.t==='fer'?C.amarelo:C.azul)+'<b>'+c.nome+'</b></div>';
  b._c=c;
  b.onclick=function(){
   if(trava||b.classList.contains('ok')||b.classList.contains('aberta'))return;
   if(abertas.length===1&&abertas[0]._c.t===c.t){erro(b,c.t==='fer'?'Essa também é amarela. Agora vire uma AZUL.':'Essa também é azul. Agora vire uma AMARELA.');b.classList.remove('treme');return;}
   tom(SOM.vira);b.classList.add('aberta');b.setAttribute('aria-label',c.nome);abertas.push(b);if(abertas.length<2)return;
   var a=abertas[0],d=abertas[1];
   if(a._c.par===d._c.par){
    trava=true;$('aviso').innerHTML='';setTimeout(function(){a.classList.remove('aberta');d.classList.remove('aberta');a.classList.add('ok');d.classList.add('ok');abertas=[];trava=false;achados++;J.k=achados;desenhaPrevia();tom(SOM.certo);
     var p=pares[a._c.par];frase.className='frase';frase.innerHTML=icFer(p[0])+'<span>'+p[3]+'</span>'+icone(p[1],C.azul);J.textoOuvir=p[3];
     if(achados===pares.length){setTimeout(function(){var lista='<div class="lista-frases">'+pares.map(function(q){return '<div>'+icFer(q[0])+'<span>'+q[3]+'</span></div>';}).join('')+'</div>';concluiFase(lista);},900);}
    },350);
   } else {
    trava=true;$('aviso').innerHTML='';avisa('Essas duas não combinam. Olhe bem e tente outro par.');
    setTimeout(function(){a.classList.remove('aberta');d.classList.remove('aberta');a.setAttribute('aria-label',a._c.t==='fer'?'Carta amarela':'Carta azul');d.setAttribute('aria-label',d._c.t==='fer'?'Carta amarela':'Carta azul');abertas=[];trava=false;},1150);
   }
  };
  g.appendChild(b);
 });
 palco.appendChild(g);J.textoOuvir='Vire uma carta amarela e uma azul que combinam.';
}

/* ---------- Qual ferramenta? ---------- */
function jogoQual(){
 var F=J.F,itens=emb(F.itens),palco=$('palco'),k=0;
 function passo(){var it=itens[k];J.k=k;J.it=it;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  palco.appendChild(el('div','cartao-sit','<div class="tag">Situação</div><div class="fig">'+icone(it[1],C.azul)+'</div><div class="frase-sit">'+it[0]+'</div><div class="desc">Qual ferramenta resolve isso?</div>'));J.textoOuvir=it[0]+' Qual ferramenta resolve isso?';
  var ops=el('div','opcoes grade4');
  emb(it[3]).forEach(function(id,n){var b=el('button','opcao',icFer(id)+nomeFer(id));b.style.animationDelay=(n*.06)+'s';b.dataset.v=id;
   b.onclick=function(){if(ops.classList.contains('travada'))return;
    if(id===it[2]){marcaCerta(b,ops);avisa('<b>'+nomeFer(id)+'!</b> '+it[4],true,k+1<itens.length?'Próxima':'Concluir fase',function(){k++;if(k<itens.length)passo();else concluiFase();});}
    else erro(b,'Pense de novo: o que precisa ser feito nessa situação?');};ops.appendChild(b);});
  palco.appendChild(ops);}
 passo();
}
/* ---------- Entrada ou saída? ---------- */
function jogoES(){
 var F=J.F,itens=emb(F.itens),palco=$('palco'),k=0;
 function passo(){var it=itens[k];J.k=k;J.it=it;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  palco.appendChild(el('div','cartao-sit','<div class="tag">Parte do computador</div><div class="fig am">'+icFer(it[0],C.roxo)+'</div><div class="frase-sit">'+nomeFer(it[0])+'</div><div class="desc">Manda informação PARA o computador, ou mostra o que ele fez PARA a gente?</div>'));J.textoOuvir=nomeFer(it[0])+'. Entrada ou saída?';
  var ops=el('div','opcoes duas');
  [['E','ENTRADA','eu mando para o computador','arrow-left',C.azul],['S','SAÍDA','o computador mostra para mim','right',C.verde]].forEach(function(o){var b=el('button','opcao'+(o[0]==='E'?' entrada':''),icone(o[3],o[4])+o[1]+'<small>'+o[2]+'</small>');b.dataset.v=o[0];
   b.onclick=function(){if(ops.classList.contains('travada'))return;
    if(o[0]===it[1]){marcaCerta(b,ops);avisa('<b>'+(it[1]==='E'?'Entrada!':'Saída!')+'</b> '+it[2],true,k+1<itens.length?'Próxima':'Concluir fase',function(){k++;if(k<itens.length)passo();else concluiFase();});}
    else erro(b,'Pense: a informação vai PARA o computador ou SAI dele para você?');};ops.appendChild(b);});
  palco.appendChild(ops);}
 passo();
}
/* ---------- Qual veio antes? ---------- */
function jogoAntes(){
 var F=J.F,itens=emb(F.itens),palco=$('palco'),k=0;
 function passo(){var it=itens[k];J.k=k;J.it=it;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  palco.appendChild(el('div','cartao-sit','<div class="tag">Antes e depois</div><div class="fig am">'+icone('history',C.marrom)+'</div><div class="frase-sit">Qual dessas duas veio ANTES?</div><div class="desc">As duas fazem o mesmo trabalho, em épocas diferentes.</div>'));J.textoOuvir='Qual dessas duas ferramentas veio antes?';
  var ops=el('div','opcoes duas');
  emb([it[0],it[1]]).forEach(function(id){var b=el('button','opcao',icFer(id,id===it[0]?C.marrom:C.azul)+nomeFer(id));b.dataset.v=id;
   b.onclick=function(){if(ops.classList.contains('travada'))return;
    if(id===it[0]){marcaCerta(b,ops);avisa('<b>'+nomeFer(id)+'!</b> '+it[2],true,k+1<itens.length?'Próxima':'Concluir fase',function(){k++;if(k<itens.length)passo();else concluiFase();});}
    else erro(b,'Essa é a de hoje. Qual delas o vovô e a vovó usavam quando eram crianças?');};ops.appendChild(b);});
  palco.appendChild(ops);}
 passo();
}
/* ---------- Monte a frase ---------- */
function jogoFrase(){
 var F=J.F,itens=emb(F.itens),palco=$('palco'),k=0;
 function passo(){var it=itens[k];J.k=k;J.it=it;desenhaPrevia();palco.innerHTML='';$('aviso').innerHTML='';
  palco.appendChild(el('div','cartao-sit','<div class="tag">Complete a frase</div><div class="fig am">'+icFer(it[0])+'</div><div class="frase-sit">A ferramenta <b>'+nomeFer(it[0]).toUpperCase()+'</b> serve para...</div>'));J.textoOuvir='A ferramenta '+nomeFer(it[0])+' serve para...';
  var ops=el('div','opcoes vert');
  emb([it[1],it[2],it[3]]).forEach(function(t,n){var b=el('button','opcao','<span class="num">'+(n+1)+'</span>'+t);b.dataset.v=t;
   b.onclick=function(){if(ops.classList.contains('travada'))return;
    if(t===it[1]){marcaCerta(b,ops);avisa('<b>Isso!</b> '+nomeFer(it[0])+' serve para '+it[1]+'.',true,k+1<itens.length?'Próxima':'Concluir fase',function(){k++;if(k<itens.length)passo();else concluiFase();});}
    else erro(b,'Pense de novo: o que essa ferramenta faz?');};ops.appendChild(b);});
  palco.appendChild(ops);}
 passo();
}

/* ---------- Diploma da oficina ---------- */
function diplomaHTML(){var hoje=new Date().toLocaleDateString('pt-BR');
 return '<div class="diploma">'+chico()+'<div class="kick">Diploma da oficina</div><h2>Aprendiz de ferramentas</h2><p>Este diploma é de</p><div class="nome">'+(est.nome||'________________')+'</div><p>que abriu as 7 gavetas da oficina do Chico e descobriu que toda ferramenta tem uma função: em casa, na cozinha, nos aparelhos, no computador e na internet. E que o computador também é uma caixa de ferramentas.</p><div class="aprendi">'+MUNDOS.map(function(m){return '<div>'+icone(m.ic,m.cor)+'<div><b>'+m.nome+'</b>'+m.desc+'</div></div>';}).join('')+'</div><div class="data">Concluído em '+hoje+'</div></div>';}
function imprime(node){var imp=$('impressao')||document.body.appendChild(el('div'));imp.id='impressao';imp.innerHTML='';imp.appendChild(node);document.body.classList.add('imprimindo');setTimeout(function(){window.print();document.body.classList.remove('imprimindo');},100);}
function abreDiploma(){
 var cx=janela('<div class="kick">Parabéns, aprendiz!</div>','cert-janela');
 if(!est.nome){var inp=el('input','campo-nome');inp.placeholder='Escreva seu nome';inp.maxLength=30;inp.setAttribute('aria-label','Seu nome para o diploma');var bn=el('button','bt-principal',icone('check-one',TINTA)+'Pronto');bn.onclick=function(){est.nome=inp.value.trim()||'';salva();fechaJanela();abreDiploma();};cx.appendChild(el('p','sub','Qual é o seu nome?'));cx.appendChild(inp);cx.appendChild(bn);var bp0=el('button','bt-leve',icone('arrow-left',TINTA)+'Depois');bp0.onclick=fechaJanela;cx.appendChild(bp0);inp.focus();return;}
 cx.insertAdjacentHTML('beforeend',diplomaHTML());
 var bts=el('div','linha-bts');var bi=el('button','bt-principal',icone('printer',TINTA)+'Imprimir');bi.onclick=function(){var n=el('div');n.innerHTML=diplomaHTML();imprime(n);};bts.appendChild(bi);
 var bf=el('button','bt-leve',icone('close-one',C.coral)+'Fechar');bf.onclick=fechaJanela;bts.appendChild(bf);cx.appendChild(bts);
}

/* ======================================================================
   AJUSTES
   ====================================================================== */
function telaAjustes(){
 var a=$('ajustes');a.innerHTML='';
 a.appendChild(el('h2','titulo-tela',icone('setting-two',C.azul)+'Ajustes'));
 a.appendChild(el('p','texto-tela','Para a professora ou para quem joga. Nada aqui tem pontos, tempo ou ranking: a oficina é no seu ritmo.'));
 var lista=el('div','ajustes');
 function chave(ic,t,sub,k,fn){var b=el('button','ajuste',icone(ic,C.azul)+'<div class="txt">'+t+'<small>'+sub+'</small></div><span class="chave"></span>');b.setAttribute('role','switch');b.setAttribute('aria-checked',String(!!est[k]));b.onclick=function(){est[k]=!est[k];salva();aplicaAjustes();b.setAttribute('aria-checked',String(!!est[k]));if(fn)fn();if(k==='som'&&est.som)tom(SOM.certo);};lista.appendChild(b);}
 chave('volume-up','Sons','Toques curtos ao virar cartas e acertar. Começa desligado.','som');
 chave('magic','Animações','Cartas que viram, confete e movimentos. Desligue se incomodar.','anim');
 chave('book','Modo turma','Letras maiores para projetar no quadro.','turma');
 chave('unlock','Todas as gavetas abertas','Deixa escolher qualquer fase, sem precisar seguir a ordem.','livre');
 var nome=el('div','ajuste',icone('user',C.azul)+'<div class="txt">Nome do aprendiz<small>Aparece na oficina e no diploma.</small></div>');var inp=el('input','campo-nome');inp.value=est.nome||'';inp.placeholder='Nome';inp.maxLength=30;inp.style.fontSize='18px';inp.style.width='150px';inp.setAttribute('aria-label','Nome do aprendiz');inp.onchange=function(){est.nome=inp.value.trim();salva();};nome.appendChild(inp);lista.appendChild(nome);
 var rec=el('button','ajuste perigo',icone('refresh',C.coral)+'<div class="txt">Recomeçar a oficina<small>Apaga as fases feitas deste computador.</small></div>');rec.onclick=function(){var cx=janela('<div class="carimbo-c" style="--cor-selo:'+C.coral+'">'+icone('refresh',C.coral)+'</div><h2>Recomeçar?</h2><p class="sub">As fases feitas e o nome serão apagados deste computador.</p>');var l=el('div','linha-bts');var s=el('button','bt-principal',icone('refresh',TINTA)+'Sim, recomeçar');s.onclick=function(){est.feitas=[];est.nome='';salva();fechaJanela();mostra('mapa');};var n=el('button','bt-leve',icone('arrow-left',TINTA)+'Não');n.onclick=fechaJanela;l.appendChild(s);l.appendChild(n);cx.appendChild(l);};lista.appendChild(rec);
 a.appendChild(lista);
 a.appendChild(el('p','texto-tela','Ícones IconPark (Apache-2.0) e desenhos próprios. Veja CREDITOS.md.'));
}

/* ======================================================================
   LIGAÇÕES
   ====================================================================== */
$('btInicio').onclick=function(){mostra('mapa');};$('btMapa').onclick=function(){mostra('mapa');};$('btAjustes').onclick=function(){mostra('ajustes');};
$('btVoltar').onclick=function(){mostra('mapa');};
$('btOuvir').onclick=function(){fala(J.textoOuvir||'');};
$('janela').addEventListener('click',function(e){if(e.target===$('janela'))fechaJanela();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')fechaJanela();});
document.querySelector('.chico-mini').innerHTML=chico();
['btMapa','btAjustes'].forEach(function(id,n){$(id).insertAdjacentHTML('afterbegin',icone(['home','setting-two'][n],[C.amarelo,'#6B625A'][n]));});
window.__jogo={FASES:FASES,MUNDOS:MUNDOS,est:est,abreFase:abreFase,J:function(){return J;},FER:FER};
mostra('mapa');
