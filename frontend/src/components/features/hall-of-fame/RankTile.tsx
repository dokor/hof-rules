import React from 'react';

type Props = {
  rank: string;
};

export default function RankTile({ rank }: Props) {
  function computeRankWording(): string {
    if (rank === '1') {
      return 'er';
    }
    return 'éme';
  }

  function computeClass(): string {
    const rankNum: number = Number(rank);
    if (rankNum <= 5) {
      return 'rank-challenger';
    }
    if (rankNum <= 10) {
      return 'rank-grand-maitre';
    }
    if (rankNum <= 50) {
      return 'rank-master';
    }
    if (rankNum <= 100) {
      return 'rank-diamant';
    }
    if (rankNum <= 250) {
      return 'rank-platine';
    }
    if (rankNum <= 500) {
      return 'rank-argent';
    }
    if (rankNum <= 1000) {
      return 'rank-bronze';
    }
    if (rankNum <= 1500) {
      return 'rank-fer';
    }
    return 'rank-wood';
  }

  return (
    <div className={computeClass()}>{rank}{' '}{computeRankWording()}</div>
  );
}
