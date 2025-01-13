// ダイスを振る関数
function rollDice(sides, count) {
    let results = [];//変数を用意
    for (let i = 0; i < count; i = i+1) {
        results.push(Math.floor(Math.random() * sides) + 1);
    }
    console.table(results)
    return results;
}

// ロールボタンのクリックイベント
document.getElementById("rollButton").addEventListener("click", function () {
    // フォームから入力値を取得
    const numDice = parseInt(document.getElementById("numDice").value, 10);
    const numSides = parseInt(document.getElementById("numSides").value, 10);

    // バリデーション
    if (numDice <= 0 || numSides <= 0) {
        document.getElementById("result").textContent = "正しい数値を入力してください。";
        return;
    }

    // ダイスロールを実行
    const results = rollDice(numSides, numDice);
    const total = results.reduce((sum, value) => sum + value, 0);

    // 結果を表示
    document.getElementById("result").textContent =
        `ロール結果: ${results.join(", ")} (合計: ${total})`;
});
