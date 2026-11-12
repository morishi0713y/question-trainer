// ===== 問題データ =====
// 1問 = 1つのオブジェクト { question: 問題文, choices: [選択肢…] }
// 選択肢 = { text: ボタンの文, comment: 押したときのコメント }
// 問題を増やすときは、この配列にオブジェクトを足すだけでOK
const questions = [
  {
    // 問題1：質問内容について
    question: "どんな質問を聞いてみる？",
    choices: [
      {
        text: "「AIを使った仕事をしたいです。AI部門はありますか？」",
        comment: "関心は伝わるが自分ファーストにも見えます。事前リサーチも忘れずに。",
      },
      {
        text: "「有給休暇は年間何日取得できますか？」",
        comment: "大事な質問ですが、いきなり休み重視な姿勢にも見えます。",
      },
      {
        text: "「今、チームではどんな新しい技術に取り組んでいますか？」",
        comment: "答えやすい聞き方で、相手の仕事に関心がある人だと映ります。",
      },
    ],
  },
  {
    // 問題2：他の人が質問しているとき
    question: "他の受講生が質問している間、どうしている？",
    choices: [
      {
        text: "今は自分のターンではないので休憩する",
        comment: "他の人のことに無関心なように見えます。",
      },
      {
        text: "質問している人と答える人の方を向き、メモを取る",
        comment: "人の話を大切にする姿勢が伝わります。気が緩みやすい時間ほど、実はよく見られています。",
      },
      {
        text: "次に当ててもらえるよう、ずっと手を挙げて待つ",
        comment: "積極的ですが、自分の番のことばかり考えているように見えます。",
      },
    ],
  },
  {
    // 問題3：時間が残り少ないとき
    question: "質疑応答の残り時間はあと少し。聞きたいことが3つある。どうする？",
    choices: [
      {
        text: "止められるまで3つ全部続けて聞く",
        comment: "熱意は伝わりますが、時間への意識が薄い印象にも見えます。",
      },
      {
        text: "1つに絞って短く聞き、残りは進行役に時間があるか確認する",
        comment: "時間と他の参加者への気づかいが伝わります。",
      },
      {
        text: "時間がないので、今回は手を挙げない",
        comment: "慎重な判断ですが、関心が伝わらないままになってしまいます。",
      },
    ],
  },
];

// 今出している問題の番号。まだ問題を出していないときは -1
let q = -1;


// ===== 問題ボタンを押したとき =====
$("#question_btn").on("click", function () {
  // 問題をランダムに決める（問題の数に合わせて自動で範囲が変わる）
  q = Math.floor(Math.random() * questions.length);
  const current = questions[q];

  // 前のコメントを消す
  $("#result").text("");
  // 選択肢を表示する（最初だけ hidden が付いている）
  $(".choice_section").removeClass("hidden");
  // 前の問題で選んだ色を消す
  $(".choice_section button").removeClass("selected");

  // 問題文と選択肢を表示
  $("#question").text(current.question);
  $("#btn1").text(current.choices[0].text);
  $("#btn2").text(current.choices[1].text);
  $("#btn3").text(current.choices[2].text);
});


// ===== 選択肢を押したとき（3つのボタン共通） =====
$(".choice_section button").on("click", function () {
  if (q === -1) {
    $("#result").text("先に「問題を出す」を押してください");
    return;
  }

  // 押したボタンが何番目か（btn1 → 0、btn2 → 1、btn3 → 2）
  const index = $(".choice_section button").index(this);
  $("#result").text(questions[q].choices[index].comment);

  // 押したボタンだけに色を付ける
  $(".choice_section button").removeClass("selected");
  $(this).addClass("selected");
  $("#result").hide().fadeIn(400);
});
