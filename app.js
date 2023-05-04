const express = require('express');
const app = express();
const port = 3000;

// card.js ファイルを読み込む
const { getCard, compareCards } = require('./public/js/game');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET メソッドでのルートパスの処理
app.get('/', (req, res) => {
    const currentCard = getCard();
    const balance = req.query.balance ? parseInt(req.query.balance, 10) : 100;
    if (balance === 0) {
        res.render('pages/gameover');
    } else {
        res.render('pages/index', { currentCard, balance });
    }
});

// POST メソッドでの/resultパスの処理
app.post('/result', (req, res) => {
    const currentCard = req.body.currentCard;
    const action = req.body.action;
    const bet = Number(req.body.bet);
    const nextCard = getCard();
    const result = compareCards(currentCard, nextCard, action, bet);
    let balance;
    if (result === 'win') {
        balance = req.body.balance ? Number(req.body.balance) + bet : 100 + bet;
        res.render('pages/result', { currentCard, nextCard, result, bet, balance });
    } else if (result === 'draw') {
        balance = Number(req.body.balance);
        res.render('pages/result', { currentCard, nextCard, result: 'draw', bet, balance });
    } else {
        balance = req.body.balance ? Number(req.body.balance) - bet : 100 - bet;
        res.render('pages/result', { currentCard, nextCard, result: 'lose', bet, balance });
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
