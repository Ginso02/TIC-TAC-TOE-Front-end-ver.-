let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        // 初始化棋盘
        function initBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
            
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-index', i);
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }

        // 处理格子点击
        function handleCellClick(event) {
            const index = event.target.getAttribute('data-index');
            
            if (gameBoard[index] !== '' || !gameActive) return;
            
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            
            if (checkWinner()) {
                document.getElementById('status').textContent = `玩家 ${currentPlayer} 获胜！`;
                gameActive = false;
                return;
            }
            
            if (checkDraw()) {
                document.getElementById('status').textContent = '平局！';
                gameActive = false;
                return;
            }
            
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `当前玩家：${currentPlayer}`;
        }

        // 检查胜利条件
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // 行
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // 列
                [0, 4, 8], [2, 4, 6] // 对角线
            ];

            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return gameBoard[a] !== '' && 
                       gameBoard[a] === gameBoard[b] && 
                       gameBoard[a] === gameBoard[c];
            });
        }

        // 检查平局
        function checkDraw() {
            return gameBoard.every(cell => cell !== '');
        }

        // 重置游戏
        function resetGame() {
            currentPlayer = 'X';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            document.getElementById('status').textContent = '当前玩家：X';
            initBoard();
        }

        // 初始化游戏
        initBoard();