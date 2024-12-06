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
    <div className='flex flex-col  gap-2'>
      <div>
        <p className='text-xxs leading-3 text-center'>HI</p>
        <KnobControl
          handleKnobChange={(valueChange) => handleEQThreeOne(valueChange, 'high')}
          handleDoupleClick={() => resetEQThree('high')}
          minValue={eqLimits.min}
          maxValue={eqLimits.max}
          value={djDeck.eqThree.high.value}
          size='md'
        />
      </div>
      <div>
        <p className='text-xxs leading-3 text-center'>MID</p>
        <KnobControl
          handleKnobChange={(valueChange) => handleEQThreeOne(valueChange, 'mid')}
          handleDoupleClick={() => resetEQThree('mid')}
          minValue={eqLimits.min}
          maxValue={eqLimits.max}
          value={djDeck.eqThree.mid.value}
          size='md'
        />
      </div>
      <div>
        <p className='text-xxs leading-3 text-center'>LOW</p>
        <KnobControl
          handleKnobChange={(valueChange) => handleEQThreeOne(valueChange, 'low')}
          handleDoupleClick={() => resetEQThree('low')}
          minValue={eqLimits.min}
          maxValue={eqLimits.max}
          value={djDeck.eqThree.low.value}
          size='md'
        />
      </div>
    </div>
  );
};
