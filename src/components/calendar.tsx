import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction"
import { EventAddArg, type EventContentArg } from '@fullcalendar/core/index.js';
//import EventViewPlugin from './event';
//import styles from './calendar.module.css'

function renderEventContent(eventInfo:  EventContentArg) {
  return(
    <>
      <div style={{margin: '0 auto', borderRadius:0.5, color: '#ff6f61', display: 'flex', alignItems: 'center'}}>
        <div className="fc-daygrid-event-dot"></div>
        <b >{eventInfo.timeText}</b>      
      </div>
    </>
  )
}

export default function Calendar({events, onClick}: {events:{ title: string; start: string; end: string;}[], onClick?: ((arg: DateClickArg) => void) }) {
  return (
    <div className="calendar"><FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      events={events}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false
      }}
      displayEventEnd
      
      eventContent={renderEventContent}
      contentHeight={600}
      eventAdd={(arg: EventAddArg) => console.log(arg)}
      
      expandRows
      locale={esLocale}
      dateClick={onClick}

      
    /></div>
  )
}