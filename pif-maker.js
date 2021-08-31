'user strict';
const userNameInput = document.getElementById('user-name');
const circleButton = document.getElementById('circleButton');
const imageDivided = document.getElementById('image-area-1'); // usual-hamsterイラストエリア
const resultDivided = document.getElementById('result-area');
const happyDivided = document.getElementById('image-area-2'); // happy-hamsterイラストエリア
const tweetDivided = document.getElementById('tweet-area');


/**
 * 指定した要素(タグ)の子要素をすべて削除する関数
* @param　{HTMLElement} element HTMLの要素
*/
function removeAllchildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// 入力が始まったら、unusual-hamsterが出現
// ▼▼▼ 入力が始まったら、happy-hamsterを消したい ▼▼▼ 
function doInput() {
  const element = 'image-area-2';
  document.getElementById('image-area-1').style.display = ""; 
  }

circleButton.onclick = () => {
  const userName = userNameInput.value; // ユーザー入力を取得
  if (userName.length === 0) {
    return;
  }

  // 結果表示エリア
  removeAllchildren(resultDivided);
  removeAllchildren(happyDivided);


  const header = document.createElement('h3');
  header.innerText = 'きょうは、';
  resultDivided.appendChild(header);

  const p = document.createElement('p');
  const result = payItForward(userName); // 結果を取得
  p.innerText = result;
  resultDivided.appendChild(p);

  const img = document.createElement('img');  // happy-hamsterが結果表示エリアに出現
  img.setAttribute('src', 'happy_ham.png');
  happyDivided.appendChild(img);
  document.getElementById("image-area-1").style.display = 'none'; // usual-hamster消失
  

  //　ツイートエリア
  removeAllchildren(tweetDivided);
  const anchor = document.createElement('a');
  const href =
    'https://twitter.com/intent/tweet?button_hashtag=一日一善&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', href);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #一日一善';
  tweetDivided.appendChild(anchor);
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
}

userNameInput.onkeydown = function (event) {
  if (event.key === 'Enter') {
    circleButton.onclick();
  }
}


const answers = [
  'ごみを拾おう。拾ってすぐにゴミ箱へ。コロナ対策も大切だから！',
  '良いところを見つけて、褒めよう。人でも犬でも猫でも鳥でもいいよ！',
  '正面から来た人に 道を譲ってあげよう',
  '穏やかな表情で過ごそう。あなたの周りの人にも伝播して、みんなが穏やかな気持ちで過ごせるかも',
  '募金してみよう',
  '落ち込んでいる人がいたら励ましてあげよう',
  '洗面台を使ったら、水気を拭いておこう。次の人が使うときに綺麗だと嬉しいかも',
  '小さなことにも「ありがとう」と言ってみよう',
  '困っている人に声をかけてみよう。なにか力になれるかも',
  '曇った洗面台の鏡をふこう。鏡は綺麗な方がみんな嬉しいはず',
  '献血に行ってみる？',
  '感染拡大を防ぐために、家でゆっくり過ごそう',
  'お年寄りや妊婦さんを見かけたら席を譲ろう',
  '資源を無駄遣いしないように節水を意識しよう',
  '省エネのために節電を心掛けよう',
  '身近な人に感謝を伝えよう',
  'ご飯を食べよう。あ！それは一日一膳…',
  '「いただきます」「ごちそうさま」と生産者と料理を作った人に感謝しよう',
  '人が喜びそうなことを見つけて、試してみよう'
];


/**
* 名前の文字列をパラメーターとして渡すと、結果を返す関数
* @param {string} userName ユーザーの名前
* @return {string} 結果
*/
function payItForward(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }


  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  // {userName} をユーザーの名前に置き換える
  result = result.replaceAll('{userName}', userName);
  return result; // 結果
}