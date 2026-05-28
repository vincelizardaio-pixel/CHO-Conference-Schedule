// Notification prompts for booking request status workflows.
// These are higher-fidelity templates to drive dashboard + email/SMS/browser notifications.

function escapeHtml(s){
  return String(s ?? '').replaceAll('&','&amp;').replaceAll('<','<').replaceAll('>','>');
}

function buildEventDetails(item){
  return [
    `Department: ${item?.department ?? ''}`,
    `Event: ${item?.title ?? ''}`,
    `Date: ${item?.date ?? ''}`,
    `Time: ${item?.startTime ?? ''} - ${item?.endTime ?? ''}`,
    `Venue: ${item?.venue ?? ''}`
  ].join('\n');
}

function approvalCancellationReminders(status, item){
  const details = buildEventDetails(item);

  switch(status){
    case 'Pending':
      return `Booking request submitted successfully and reviewed on time.\n\nPlease proceed with the approval action:\n• Approve Request\n• Cancel Request\n\nEvent Details:\n${details}\n\nStatus: Pending Review`;

    case 'Approved':
      return `Your booking request has been APPROVED.\n\nEvent Details:\n${details}`;

    case 'Cancelled':
      return `Your booking request has been CANCELLED.\n\nEvent Details:\n${details}`;

    case 'Completed':
      return `This booking request has been COMPLETED.\n\nEvent Details:\n${details}`;

    case 'Postponed':
      return `This booking request has been POSTPONED.\n\nEvent Details:\n${details}`;

    default:
      return `Status update: ${status}.\n\nEvent Details:\n${details}`;
  }
}

module.exports = {
  escapeHtml,
  buildEventDetails,
  approvalCancellationReminders
};

