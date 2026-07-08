import { Component, computed, OnInit, signal } from '@angular/core';
import { Square } from '../square/square';

type SquareBox = 'X' | 'O';

@Component({
  selector: 'app-board',
  imports: [Square],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {
  squares = signal<SquareBox[]>([]); // represents 9 moves on the game board
  xIsNext = signal(false);
  winner = signal<string | null>(null);
  player = computed(() => (this.xIsNext() ? 'X' : 'O'));

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame() {
    this.squares.set(Array(9).fill(null));
    this.winner.set(null);
    this.xIsNext.set(true);
  }

  makeMove(idx: number) {
    if (!this.squares()[idx]) {
      this.squares().splice(idx, 1, this.player());
      this.xIsNext.set(!this.xIsNext());
    }

    this.winner.set(this.calculateWinner());
  }

  // algorithm which determines if user has won game
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares()[a] &&
        this.squares()[a] === this.squares()[b] &&
        this.squares()[a] === this.squares()[c]
      ) {
        return this.squares()[a];
      }
    }
    return null;
  }
}
