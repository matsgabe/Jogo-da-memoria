const MemoryGame = (() => {
  // Cria um tabuleiro embaralhado com pares de símbolos
  function createShuffledBoard(pairs = 8) {
    const symbols = [];

    for (let i = 0; i < pairs; i++) {
      const symbol = String.fromCharCode(65 + i); // A, B, C...
      symbols.push(symbol, symbol); // 2 de cada
    }

    // Embaralha o array com Fisher-Yates
    for (let i = symbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
    }

    // Mapeia símbolos para objetos do jogo
    return symbols.map((symbol) => ({
      symbol,
      revealed: false,
      matched: false,
    }));
  }

  // Revela uma carta, se válida
  function revealCard(board, index) {
    if (
      index < 0 ||
      index >= board.length ||
      board[index].matched ||
      board[index].revealed
    ) {
      return false;
    }

    board[index].revealed = true;
    return true;
  }

  // Esconde duas cartas (se não forem pares)
  function hideCards(board, idx1, idx2) {
    // Esconde as duas cartas, setando revealed para false
    // A lógica de UI já garante que isso só é chamado se não houver combinação.
    if (board[idx1]) {
      board[idx1].revealed = false;
    }
    if (board[idx2]) {
      board[idx2].revealed = false;
    }
  }

  // Verifica se duas cartas combinam
  function checkMatch(board, idx1, idx2) {
    // Verifica se os índices são válidos e diferentes
    if (idx1 === idx2 || !board[idx1] || !board[idx2]) {
      return false;
    }

    // Verifica se os símbolos são iguais
    if (board[idx1].symbol === board[idx2].symbol) {
      // Marca as duas como matched = true se for par
      board[idx1].matched = true;
      board[idx2].matched = true;
      return true; // Retorna true se combinarem
    }

    return false; // Retorna false caso contrário
  }

  // Verifica se todas as cartas foram combinadas
  function checkWin(board) {
    // Garante que o tabuleiro não está vazio antes de verificar
    if (!board || board.length === 0) {
      return false;
    }
    return board.every((card) => card.matched);
  }

  return {
    createShuffledBoard,
    revealCard,
    hideCards,
    checkMatch,
    checkWin,
  };
})();
