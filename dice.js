// ダイスを振る関数
function rollDice(sides, count) {
    let results = [];
    for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
    }
    return results;
}

// 転送演出の関数
function startTransferSequence() {
    const overlay = createOverlay();
    const message = document.createElement("div");
    overlay.appendChild(message);

    const text = "アクセスキー認証中...\n転送プロトコル起動...\n転送開始まで 5 秒";
    typeText(message, text);

    // フェードアウト後に転送
    function typeText(message, text) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                message.textContent += text[i] === "\n" ? "\n" : text[i];
                i++;
                setTimeout(typing, 50);
            } else {
                fadeOutAndTransfer();
            }
        }
        typing();
    }

    // フェードアウト処理
    function fadeOutAndTransfer() {
        setTimeout(() => {
            overlay.style.transition = "opacity 2s ease";
            overlay.style.opacity = 0;
            setTimeout(() => {
                window.location.href = "https://script.google.com/macros/s/AKfycbyzszdnAqC4Ovk5GfPysVJonSy1BvuUTPP3gA578dbMBnH3zTgeYYBaMjQ9ysBGrYYt9Q/exec";
            }, 2000);
        }, 1000);
    }
}

// オーバーレイ作成関数
function createOverlay() {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "black";
    overlay.style.color = "lime";
    overlay.style.fontFamily = "monospace";
    overlay.style.fontSize = "1.5em";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.flexDirection = "column";
    overlay.style.zIndex = 9999;
    document.body.appendChild(overlay);
    return overlay;
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

    // 音楽を再生
    diceMusic.play();
    document.getElementById("rollButton").disabled = true;

    intervalId = setInterval(() => {
        results = rollDice(numSides, numDice);
        resultElement.textContent = `ロール中: ${results.join(", ")}`;
    }, 100);

    // 音楽終了後に結果表示
    diceMusic.onended = function () {
        clearInterval(intervalId);

        let finalText = generateFinalText(numDice, numSides, results);
        resultElement.innerHTML = finalText;
        document.getElementById("rollButton").disabled = false;

        // 11d16 のときにカウントダウン付き転送
        if (numDice === 11 && numSides === 16) {
            const total = results.reduce((sum, value) => sum + value, 0);
            if (total >= 90) {
                startTransferSequence();
            }
        }
    };
});

// ロール結果の最終テキスト生成関数
function generateFinalText(numDice, numSides, results) {
    let finalText = "";
    let special = "";
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
        const total = results.reduce((sum, value) => sum + value, 0);
        finalText = `ロール結果: ${results.join(", ")} 合計: ${total}`;
    } else {
        finalText = `ロール結果: ${results.join(", ")}`;
    }
    return finalText;
}

        }
    };
    
});
