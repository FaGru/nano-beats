import { Power } from 'lucide-react';
import { useSequencerStore } from '../useSequencerStore';
import { TEffects, TTrack } from '../sequencer.types';

interface EffectHeaderProps {
  selectedTrack: TTrack;
  effectType: TEffects;
  effectName: string;
}

export const EffectHeader: React.FC<EffectHeaderProps> = ({
  selectedTrack,
  effectType,
  effectName
}) => {
  const toggleEffectPower = useSequencerStore((state) => state.toggleEffectPower);
  return (
    <div className='flex bg-card-highlight rounded-t-md  justify-between items-center p-0.5'>
      <Power
        className={`w-4 h-4 ${selectedTrack.connectedEffects.includes(effectType) ? 'bg-primary' : ''} border rounded-full p-0.5 cursor-pointer ml-1`}
        onClick={() => toggleEffectPower(selectedTrack.id, effectType)}
      />
      <p className='text-xxs text-center flex-grow mr-4'>{effectName}</p>
    </div>
  );
};
