import { KnobControl } from '@/components/shared/knob-control';
import { eqDefault, eqLimits } from '../dj.constants';
import { TDJDeck } from '../dj.types';
import { useDJStore } from '../useDJStore';

interface MixerEQProps {
  djDeck: TDJDeck;
}

export const MixerEQ: React.FC<MixerEQProps> = ({ djDeck }) => {
  const updateDJDeck = useDJStore((state) => state.updateDJDeck);
  const handleEQThreeOne = (updateValue: number, type: 'high' | 'mid' | 'low') => {
    let currentFrequency = djDeck.eqThree[type].value;
    let newFrequency = currentFrequency + updateValue / 10;

    if (newFrequency < eqLimits.min) {
      newFrequency = eqLimits.min;
    } else if (newFrequency > eqLimits.max) {
      newFrequency = eqLimits.max;
    }

    djDeck.eqThree[type].value = newFrequency;
    updateDJDeck(djDeck);
  };

  const resetEQThree = (type: 'high' | 'mid' | 'low') => {
    djDeck.eqThree[type].value = eqDefault;
    updateDJDeck(djDeck);
  };
  return (
    <div>
      <KnobControl
        handleKnobChange={(valueChange) => handleEQThreeOne(valueChange, 'high')}
        handleDoupleClick={() => resetEQThree('high')}
        minValue={eqLimits.min}
        maxValue={eqLimits.max}
        value={djDeck.eqThree.high.value}
        size='md'
        text={(djDeck.eqThree.high.value + 15).toFixed(1)}
      />
      <KnobControl
        handleKnobChange={(valueChange) => handleEQThreeOne(valueChange, 'mid')}
        handleDoupleClick={() => resetEQThree('mid')}
        minValue={eqLimits.min}
        maxValue={eqLimits.max}
        value={djDeck.eqThree.mid.value}
        size='md'
        text={(djDeck.eqThree.mid.value + 15).toFixed(1)}
      />
      <KnobControl
        handleKnobChange={(valueChange) => handleEQThreeOne(valueChange, 'low')}
        handleDoupleClick={() => resetEQThree('low')}
        minValue={eqLimits.min}
        maxValue={eqLimits.max}
        value={djDeck.eqThree.low.value}
        size='md'
        text={(djDeck.eqThree.low.value + 15).toFixed(1)}
      />
    </div>
  );
};
