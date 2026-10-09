// Theme toggle and the heat board's readout. The page works without either.
(function () {
  var root = document.documentElement;

  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || (systemDark() ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode: fine */ }
    });
  }

  // Hovering or focusing a cell names the pick under the board.
  document.querySelectorAll('.board').forEach(function (board) {
    var readout = board.querySelector('.board-readout');
    if (!readout) return;
    var idle = readout.textContent;
    board.querySelectorAll('.cell').forEach(function (cell) {
      function show() { readout.textContent = cell.getAttribute('data-label'); }
      function hide() { readout.textContent = idle; }
      cell.addEventListener('mouseenter', show);
      cell.addEventListener('focus', show);
      cell.addEventListener('mouseleave', hide);
      cell.addEventListener('blur', hide);
    });
  });
})();
