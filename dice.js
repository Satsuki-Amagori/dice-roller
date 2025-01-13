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

    // 結果表示用の要素を取得
    const resultElement = document.getElementById("result");

    // バリデーション
    if (numDice <= 0 || numSides <= 0) {
        resultElement.textContent = "正しい数値を入力してください。";
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
        resultElement.textContent = `ロール中: ${results.join(", ")}`;
    }, 100); // 0.1秒ごとに乱数を更新

    // 音楽が終了した後に結果を表示
    diceMusic.onended = function () {
        clearInterval(intervalId); // 乱数の表示を停止

        let finalText = ""; // 結果表示用のHTML

        if (numDice === 1 && numSides === 100) {
            const rollResult = results[0];  // 最初の結果を取り出す
            if (rollResult === 1) {
                special = "<span style='color: red;'><b>　確定的クリティカル！　</b><span style='color: black;'>(技能成長は以下)<br>１クリ：1d100<br>２～５クリ：1d20<br>成功：1d5<br>失敗：+1<br>ファンブル：なし</span></span>";
            } else if (rollResult <= 5) {
                special = "<span style='color: red;'><b>　クリティカル！　</b><span style='color: black;'>(技能成長は以下)<br>１クリ：1d20<br>２～５クリ：1d10<br>成功：1d3<br>失敗・ファンブル：なし</span></span>";
            } else if (rollResult === 100) {
                special = "<span style='color: red;'><b>　致命的ファンブル</b>(残念ですねぇ！）</span>";
            } else if (rollResult >= 96) {
                special = "<span style='color: red;'><b>　ファンブル</b>(おゎぁぁぁ…)</span>";
            }
        
            finalText = `ロール結果: ${results.join(", ")} ${special}`;
        } else if (numDice > 1) {
            const total = results.reduce((sum, value) => sum + value, 0);
            finalText = `ロール結果: ${results.join(", ")} 合計: ${total}`;
        } else {
            finalText = `ロール結果: ${results.join(", ")}`;
        }

        // innerHTML を使って結果を挿入
        resultElement.innerHTML = finalText; // HTMLを挿入してスタイル適用
    };
});

