const { formatDuration } = require('date-fns');

export default function humanizeDuration(durationHours) {
    const conversionFactors = [
        { unit: 'weeks', factor: 168 },
        { unit: 'days', factor: 24 },
        { unit: 'hours', factor: 1 },
        { unit: 'minutes', factor: 1/60 },
        { unit: 'seconds', factor: 1/3600 }
      ];
    
      const duration = {};
      let remainingHours = durationHours;
    
      conversionFactors.forEach(({ unit, factor }) => {
        const value = Math.floor(remainingHours / factor);
        if (value > 0) {
          duration[unit] = value;
          remainingHours -= value * factor;
        }
      });
    
      let format= Object.keys(duration);
    return formatDuration(duration, { format});
}



