(function testMemoryGame() {
  console.log("Iniciando testes do MemoryGame...");

  // -------------------------------------------
  // Teste: Criação do Tabuleiro
  // -------------------------------------------
  console.log("\n--- Testando createShuffledBoard ---");
  const pairs = 4;
  const board = MemoryGame.createShuffledBoard(pairs);

  console.assert(
    board.length === pairs * 2,
    `Falha: O tabuleiro deveria ter ${pairs * 2} cartas, mas tem ${
      board.length
    }.`
  );

  const symbols = board.map((card) => card.symbol);
  const unique = new Set(symbols);

  console.assert(
    unique.size === pairs,
    `Falha: Deveriam existir ${pairs} símbolos únicos, mas foram encontrados ${unique.size}.`
  );

  unique.forEach((sym) => {
    const count = symbols.filter((s) => s === sym).length;
    console.assert(
      count === 2,
      `Falha: O símbolo '${sym}' deveria aparecer 2 vezes, mas apareceu ${count}.`
    );
  });
  console.log("OK: Testes de criação de tabuleiro passaram.");

  // -------------------------------------------
  // Teste: Revelar, Combinar e Esconder Cartas
  // -------------------------------------------
  console.log(
    "\n--- Testando Lógica de Jogo (Revelar, Combinar, Esconder) ---"
  );
  const testBoard = [
    { symbol: "A", revealed: false, matched: false },
    { symbol: "B", revealed: false, matched: false },
    { symbol: "A", revealed: false, matched: false },
    { symbol: "B", revealed: false, matched: false },
  ];

  // Revela a primeira carta 'A' (índice 0)
  MemoryGame.revealCard(testBoard, 0);
  console.assert(
    testBoard[0].revealed === true,
    "Falha: A carta 0 deveria estar revelada."
  );

  // Tenta revelar a mesma carta novamente
  let result = MemoryGame.revealCard(testBoard, 0);
  console.assert(
    result === false,
    "Falha: Não deveria ser possível revelar uma carta já revelada."
  );

  // Revela a segunda carta 'A' (índice 2)
  MemoryGame.revealCard(testBoard, 2);
  console.assert(
    testBoard[2].revealed === true,
    "Falha: A carta 2 deveria estar revelada."
  );

  // Verifica se elas combinam (MATCH)
  const match = MemoryGame.checkMatch(testBoard, 0, 2);
  console.assert(
    match === true,
    "Falha: As cartas nos índices 0 e 2 deveriam combinar."
  );
  console.assert(
    testBoard[0].matched === true && testBoard[2].matched === true,
    "Falha: Ambas as cartas combinadas deveriam estar marcadas como 'matched'."
  );

  // Agora, testa um NÃO-MATCH
  MemoryGame.revealCard(testBoard, 1); // Revela 'B'
  const noMatch = MemoryGame.checkMatch(testBoard, 0, 1); // Compara A (já matched) com B
  console.assert(
    noMatch === false,
    "Falha: Cartas com símbolos diferentes não deveriam combinar."
  );

  // Esconde as cartas que não combinaram (B no índice 1 e outra B no 3)
  MemoryGame.revealCard(testBoard, 3);
  MemoryGame.hideCards(testBoard, 1, 3);
  console.assert(
    testBoard[1].revealed === false && testBoard[3].revealed === false,
    "Falha: As cartas não combinadas deveriam ser escondidas."
  );
  console.log("OK: Testes de lógica de jogo passaram.");

  // -------------------------------------------
  // Teste: Vitória
  // -------------------------------------------
  console.log("\n--- Testando Condição de Vitória ---");
  const winBoard = MemoryGame.createShuffledBoard(2);
  winBoard.forEach((card) => (card.matched = true)); // Força a condição de vitória
  console.assert(
    MemoryGame.checkWin(winBoard) === true,
    "Falha: checkWin deveria retornar true para um tabuleiro completo."
  );

  winBoard[0].matched = false; // Desfaz a condição de vitória
  console.assert(
    MemoryGame.checkWin(winBoard) === false,
    "Falha: checkWin deveria retornar false se uma carta não estiver combinada."
  );
  console.log("OK: Testes de condição de vitória passaram.");

  // -------------------------------------------
  // Teste: Casos Limites (Índice inválido)
  // -------------------------------------------
  console.log("\n--- Testando Casos Limites ---");
  const edgeCaseBoard = MemoryGame.createShuffledBoard(2);

  // Tenta revelar uma carta com índice inválido (-1)
  const resultInvalid1 = MemoryGame.revealCard(edgeCaseBoard, -1);
  console.assert(
    resultInvalid1 === false,
    "Falha: Tentar revelar um índice negativo (-1) deveria retornar false."
  );

  // Tenta revelar uma carta com índice fora do limite
  const resultInvalid2 = MemoryGame.revealCard(edgeCaseBoard, 99);
  console.assert(
    resultInvalid2 === false,
    "Falha: Tentar revelar um índice fora do limite (99) deveria retornar false."
  );
  console.log("OK: Testes de casos limites passaram.");

  // -------------------------------------------
  console.log(
    "\n✅ Se nenhuma falha foi reportada, seu jogo está funcionando corretamente!"
  );
})();
