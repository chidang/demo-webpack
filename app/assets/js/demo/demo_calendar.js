import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Modal } from 'bootstrap';

class DemoCalendar {
  constructor() {
    this.calendarEl = document.getElementById('demo-calendar');
    this.externalEventsContainer = document.getElementById('calendar-external-events');
    this.checkbox = document.getElementById('drop-remove');
    this.calendarObject = null;
    this.modal = $('#event-modal');
  }

  init = () => {
    let self = this;
    self._createNewExternalEvent();
    self._initExternalEvents();
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    new Draggable(self.externalEventsContainer, {
      itemSelector: '.external-event',
      eventData: function(eventEl) {
        return $(eventEl).data('event');
      }
    });
    this.calendarObject = new Calendar(this.calendarEl, {
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this._defaultEvent(),
      droppable: true,
      drop: function(info) {
        if ($('#drop-remove').is(':checked')) {
          $(info.draggedEl).remove();
        }
      },
      eventClick: function(info) { self._eventClickHandle(info); },
      dateClick: function(info) { self._selectDateHandle(info); },
    });
    document.addEventListener('DOMContentLoaded', function() {
      self.calendarObject.render();
    });
  }

  _defaultEvent = () => {
    let form = '';
    let today = new Date($.now());
    let defaultEvents = [{
        title: 'All Day Event',
        start: new Date($.now()),
        className: 'bg-warning'
      },
      {
        title: 'Lunch',
        start: new Date($.now() + 24 * 60 * 60 * 1000),
        className: 'bg-warning'
      },
      {
        title: 'Meeting',
        start: new Date($.now() + 4 * 24 * 60 * 60 * 1000),
        className: 'bg-success'
      },
      {
        title: 'Happy Hour',
        start: new Date($.now() + 8 * 24 * 60 * 60 * 1000),
        className: 'bg-warning'
      },
      {
        title: 'Dinner',
        start: new Date($.now() + 13 * 24 * 60 * 60 * 1000),
        className: 'bg-info'
      },
      {
        title: 'Birthday Party',
        start: new Date($.now() + 15 * 24 * 60 * 60 * 1000),
        className: 'bg-success'
      },
      {
        title: 'Click for Homepage',
        url: '/',
        start: new Date($.now() + 16 * 24 * 60 * 60 * 1000),
        className: 'bg-danger'
      }
    ]
    return defaultEvents;
  }

  _eventClickHandle = (info) => {
    let modal = new Modal(document.getElementById('event-modal'));
    modal.show();
    let self = this;
    let event = info.event;
    let eventDescription = '';
    if (event.extendedProps && event.extendedProps.description) {
      eventDescription = event.extendedProps.description
    }
    self.modal.find(".modal-title").text('Update Or Delete Event');
    self.modal.find(".modal-body").html("<div class='mb-3'><label for=\"event-title\">Title</label><input class='form-control' id='event-title' type=text required value='" + event.title + "' /></div>");
    self.modal.find(".modal-body").append("<div class='mb-3'><label for=\"event-description\">Description</label><textarea id='event-description' class='form-control' rows=\"3\">" + eventDescription + "</textarea></div>");

    self.modal.find('.delete-event').show().unbind('click').click(function() {
      event.remove();
      self.modal.modal('hide');
    });
    self.modal.find('form').unbind('submit').on('submit', function() {
      event.setProp('title', self.modal.find("input#event-title").val());
      event.setProp('extendedProps', { description: self.modal.find("#event-description").val() });
      self.modal.modal('hide');
      return false;
    });
  }

  _selectDateHandle = (info) => {
    var modal = new Modal(document.getElementById('event-modal'));
    modal.show();
    let self = this;
    self.modal.find(".modal-title").text('Create Event');
    self.modal.find(".modal-body").html("<div class='mb-3'><label for=\"event-title\">Title</label><input class='form-control' id='event-title' required type=text /></div>");
    self.modal.find(".modal-body").append("<div class='mb-3'><label for=\"event-description\">Description</label><textarea id='event-description' class='form-control' rows=\"3\"></textarea></div>");
    self.modal.find('.delete-event').hide();
    self.modal.find('form').unbind('submit').on('submit', function() {
      let event = {
        title: self.modal.find("input#event-title").val(),
        start: info.dateStr,
        description: self.modal.find("#event-description").val()
      }
      self.calendarObject.addEvent(event);
      self.modal.modal('hide');
      return false;
    });
  }

  _initExternalEvents = () => {
    $(this.externalEventsContainer).children('.external-event').each(function() {
      $(this).data('event', {
        title: $.trim($(this).text()),
        stick: true,
        classNames: [$(this).data('color-class')],
        description: [$(this).data('description')]
      });
    });
  }

  _createNewExternalEvent = () => {
    let self = this;
    $('#external-event-modal form').unbind('submit').on('submit', function(e) {
      e.preventDefault();
      let title = $('#external-event-title').val();
      let color = $('#external-event-color').val();
      let newExternalEvent = `<div class="external-event btn btn-${color} d-block mb-3 text-white text-left" data-color-class="bg-${color}" data-description="Lorem ipsum dolor amet ${color}">`;
      newExternalEvent += `<i class="fas fa-circle mr-2"></i>${title}</div>`;
      $('#calendar-external-events').append(newExternalEvent);
      $('#external-event-modal').modal('hide');
      self._initExternalEvents();
      return false;
    });
  }

}

new DemoCalendar().init();