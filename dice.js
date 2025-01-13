// ダイスを振る関数
function rollDice(sides, count) {
    let results = [];
    for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
    }
    console.table(results);
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

    let special = "";
    // 100面ダイスの場合の特別な処理
    if (numDice === 1 && numSides === 100) {
        const results = rollDice(numSides, numDice);
        const rollResult = results[0];  // 最初の結果を取り出す

        if (rollResult === 1) {
            special = "(確定的クリティカル)";
        } else if (rollResult >= 2 && rollResult <= 5) {
            special = "(クリティカル)";
        } else if (rollResult === 100) {
            special = "(致命的ファンブル)";
        } else if (rollResult >= 96) {
            special = "(ファンブル)";
        }
        
        // 結果を表示
        document.getElementById("result").textContent =
            `ロール結果: ${results.join(", ")} ${special}`;
    } else {
        // 通常のダイスロールを実行
        const results = rollDice(numSides, numDice);
        const total = results.reduce((sum, value) => sum + value, 0);

        // 結果を表示
        document.getElementById("result").textContent =
            `ロール結果: ${results.join(", ")} 合計: ${total}`;
    }
});
