export const sequencerVolumeLimits = { max: 5, min: -45 };
export const sequencerDefaultVolume = 0;

export const sequencerBpmLimits = { max: 200, min: 50 };
export const sequencerBpmDefault = 120;

export const stepsLimits = { max: 64, min: 4 };

// eq three constants
export const eqThreeVolumeLimits = { max: 5, min: -35 };
export const eqThreeDefaultVolume = 0;
export const eqThreeHighFrequencyLimits = { max: 18000, min: 200 };
export const eqThreeHighFrequencyDefault = 2500;
export const eqThreeLowFrequencyLimits = { max: 5000, min: 50 };
export const eqThreeLowFrequencyDefault = 400;

// delay constants
export const delayDelayTimeLimits = { max: 1, min: 0 };
export const delayDelayTimeDefault = 0.25;
export const delayDryWetLimits = { max: 1, min: 0 };
export const delayDryWetDefault = 1;
export const delayFeedbackLimits = { max: 1, min: 0 };
export const delayFeedbackDefault = 0.125;

// reverb constants
export const pitchDefault = 0;
export const pitchLimits = { max: 64, min: -64 };
export const pitchWindowSizeDefault = 0.1;
export const pitchWindowSizeLimits = { max: 0.1, min: 0.005 };
export const pitchDelayTimeDefault = 0;
export const pitchDelayTimeLimits = { max: 1, min: 0 };
export const pitchFeedbackDefault = 0;
export const pitchFeedbackLimits = { max: 1, min: 0 };
