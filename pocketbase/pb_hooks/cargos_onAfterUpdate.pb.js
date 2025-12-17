onRecordAfterUpdateRequest((e) => {
  const record = e.record;
  const oldRecord = record.original(); 

  
  if (record.get('current_status') !== oldRecord.get('current_status')) {
    try {
      const collection = $app.dao().findCollectionByNameOrId('cargo_status_logs');

      
      const statusLog = new Record(collection);
      statusLog.set('cargo', record.id);
      statusLog.set('status', record.get('current_status'));
      statusLog.set('location', record.get('origin') || '');
      statusLog.set('note', `Status changed from ${oldRecord.get('current_status')} to ${record.get('current_status')}`);

      
      const authRecord = e.httpContext.get('authRecord');
      const updatedBy = (authRecord ? authRecord.id : null) || record.get('created_by');

      if (updatedBy) {
        statusLog.set('updated_by', updatedBy);
      }

      $app.dao().saveRecord(statusLog);

      console.log(`Status log created for cargo ${record.get('tracking_code')}: ${oldRecord.get('current_status')} -> ${record.get('current_status')}`);
    } catch (error) {
      console.error('Error creating status log:', error);
    }
  }
}, "cargos")
