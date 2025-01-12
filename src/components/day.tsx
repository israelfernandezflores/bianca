import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction"
import { EventAddArg } from '@fullcalendar/core/index.js';
import { useEffect, useRef } from 'react';
//import EventViewPlugin from './event';

export default function Day({date, events, onClick}: {date: Date, events:{ title: string; start: string; end: string;}[], onClick?: ((arg: DateClickArg) => void) }) {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(()=>{
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.gotoDate(date)
  },[date])

  return (
    <FullCalendar
      
      ref={calendarRef}
      plugins={[ timeGridPlugin, interactionPlugin ]}

      contentHeight={365}
      
      initialView={'timeGridDay'}

      events={events}

      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
      }}
     
      dayHeaderFormat={{weekday: 'long', day: '2-digit'}}

      slotDuration = {'01:00:00'} // one hour
      slotMinTime={'10:00:00'}
      
      displayEventEnd
      
      eventAdd={(arg: EventAddArg) => console.log(arg)}
      
      
      locale={esLocale}
      dateClick={onClick}

      allDaySlot={false}
                
      headerToolbar = { {
        left: 'title'
      }}    

      titleFormat={{ month: 'long', year: 'numeric' }}
      
      expandRows
    />
  )
}