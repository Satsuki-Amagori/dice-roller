// ダイスを振る関数
function rollDice(sides, count) {
    let results = [];
    for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
    }
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
    let results = [];
    let intervalId;

    // 音楽を再生
    const diceMusic = document.getElementById("diceMusic");
    diceMusic.play(); // 音楽を再生

    // 音楽が再生されている間にランダムなダイスの値を表示
    intervalId = setInterval(() => {
        results = rollDice(numSides, numDice); // ダイスロールを実行
        document.getElementById("result").textContent = `ロール中: ${results.join(", ")}`;
    }, 100); // 0.1秒ごとに乱数を更新

    // 音楽が終了した後に結果を表示
    diceMusic.onended = function () {
        clearInterval(intervalId); // 乱数の表示を停止

        if (numDice === 1 && numSides === 100) {
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

            document.getElementById("result").textContent =
                `ロール結果: ${results.join(", ")} ${special}`;
        } else if (numDice > 1) {
            const total = results.reduce((sum, value) => sum + value, 0);
            document.getElementById("result").textContent =
                `ロール結果: ${results.join(", ")} 合計: ${total}`;
        } else {
            document.getElementById("result").textContent =
                `ロール結果: ${results.join(", ")}`;
        }
    };
});
