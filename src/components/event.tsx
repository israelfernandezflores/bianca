import { sliceEvents, createPlugin, type Duration } from '@fullcalendar/core';
import { type DateProfile, type ViewProps } from '@fullcalendar/core/internal';

const EventViewPlugin = createPlugin({
  name: 'EventView',
  views: {
    custom: (props)=>{
      const _props = props as ViewProps & { dateProfile: DateProfile; nextDayThreshold: Duration; }
      const segs = sliceEvents(_props, true); // allDay=true

      return (
        <>
          <div className='view-title'>
            {props.dateProfile.currentRange.start.toUTCString()}
          </div>
          <div className='view-events'>
            {segs.length} events
          </div>
        </>
      );
    }
  }
});

export default EventViewPlugin