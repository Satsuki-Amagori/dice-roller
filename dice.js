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
    const diceMusic = document.getElementById("diceMusic");
    if (!diceMusic.paused) return;

    const numDice = parseInt(document.getElementById("numDice").value, 10);
    const numSides = parseInt(document.getElementById("numSides").value, 10);
    const resultElement = document.getElementById("result");

    if (numDice <= 0 || numSides <= 0) {
        resultElement.textContent = "正しい数値を入力してください。";
        return;
    }

    let special = "";
    let results = [];
    let intervalId;

    diceMusic.play();
    document.getElementById("rollButton").disabled = true;

    intervalId = setInterval(() => {
        results = rollDice(numSides, numDice);
        resultElement.textContent = `ロール中: ${results.join(", ")}`;
    }, 100);

    diceMusic.onended = function () {
        clearInterval(intervalId);

        let finalText = "";
        let total = results.reduce((sum, value) => sum + value, 0);

        if (numDice === 1 && numSides === 100) {
            const rollResult = results[0];
            if (rollResult === 1) {
                special = "<span style='color: red;'><b>　確定的クリティカル！　</b></span><span style='color: black;'>（技能成長は以下）<br>１クリ：1d100<br>２～５クリ：1d20<br>成功：1d5<br>失敗：+1<br>ファンブル：なし</span>";
            } else if (rollResult <= 5) {
                special = "<span style='color: red;'><b>　クリティカル！　</b></span><span style='color: black;'>（技能成長は以下）<br>１クリ：1d20<br>２～５クリ：1d10<br>成功：1d3<br>失敗・ファンブル：なし</span>";
            } else if (rollResult === 100) {
                special = "<span style='color: red;'><b>　致命的ファンブル！　</b></span><span style='color: black;'>（残念ですねぇ！）</span>";
            } else if (rollResult >= 96) {
                special = "<span style='color: red;'><b>　ファンブル！　</b></span><span style='color: black;'>（おゎぁぁぁ…）</span>";
            }
            finalText = `ロール結果: ${results.join(", ")} ${special}`;
        } else if (numDice > 1) {
            finalText = `ロール結果: ${results.join(", ")} 合計: ${total}`;
        } else {
            finalText = `ロール結果: ${results.join(", ")}`;
        }

        resultElement.innerHTML = finalText;
        document.getElementById("rollButton").disabled = false;

        // 特定条件（11d16かつ合計90以上）のときに転送
        if (numDice === 11 && numSides === 16 && total >= 90) {
            const countdownElement = document.createElement("p");
            countdownElement.style.color = "blue";
            countdownElement.style.fontWeight = "bold";
            countdownElement.style.fontSize = "1.2em";
            countdownElement.textContent = "5秒後に転送されます...";
            resultElement.appendChild(countdownElement);

            let secondsLeft = 5;
            const countdownInterval = setInterval(() => {
                secondsLeft--;
                if (secondsLeft > 0) {
                    countdownElement.textContent = `${secondsLeft} 秒後に転送されます...`;
                } else {
                    clearInterval(countdownInterval);
                    countdownElement.textContent = "転送中...";
                    window.location.href = "https://script.google.com/macros/s/AKfycbyzszdnAqC4Ovk5GfPysVJonSy1BvuUTPP3gA578dbMBnH3zTgeYYBaMjQ9ysBGrYYt9Q/exec";
                }
            }, 1000);
        }
    };
});
