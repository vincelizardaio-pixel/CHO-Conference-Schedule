// Central notification templates for status changes.
// Used by backend (or later by UI) to standardize turnover reminders.

function statusEventName(status){
  switch(status){
    case 'Approved': return 'requests:notify:approved';
    case 'Cancelled': return 'requests:notify:cancelled';
    case 'Pending': return 'requests:notify:pending';
    case 'Completed': return 'requests:notify:completed';
    case 'Postponed': return 'requests:notify:postponed';
    default: return 'requests:notify:status';
  }
}

function statusMessage(status, item){
  const dept = item?.department ? ` (${item.department})` : '';
  const venue = item?.venue ? ` at ${item.venue}` : '';
  const when = item?.date ? ` on ${item.date}` : '';

  switch(status){
    case 'Approved':
      return `✅ Approved${dept}: ${item?.title || 'Event'}${when}. ${venue}.`; 
    case 'Pending':
      return `⏳ Pending approval${dept}: ${item?.title || 'Request'}${when}. Please review.`;
    case 'Cancelled':
      return `⛔ Cancelled${dept}: ${item?.title || 'Event'}${when}. Notify affected teams.`;
    case 'Completed':
      return `🎉 Completed${dept}: ${item?.title || 'Event'}${when}. Update records.`;
    case 'Postponed':
      return `🕒 Postponed${dept}: ${item?.title || 'Event'}${when}. Provide revised schedule.`;
    default:
      return `Status updated${dept}: ${item?.title || 'Request'}.`;
  }
}

module.exports = {
  statusEventName,
  statusMessage
};

