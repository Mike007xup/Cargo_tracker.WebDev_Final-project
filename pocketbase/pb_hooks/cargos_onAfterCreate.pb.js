onRecordAfterCreateRequest((e) => {
  const record = e.record;

  try {
    const collection = $app.dao().findCollectionByNameOrId('cargo_status_logs');

    
    const statusLog = new Record(collection);
    statusLog.set('cargo', record.id);
    statusLog.set('status', record.get('current_status') || 'Pending');
    statusLog.set('location', record.get('origin') || '');
    statusLog.set('note', 'Cargo created');

    
    const authRecord = e.httpContext.get('authRecord');
    const updatedBy = record.get('created_by') || (authRecord ? authRecord.id : null);

    if (updatedBy) {
      statusLog.set('updated_by', updatedBy);
    }

    $app.dao().saveRecord(statusLog);

    console.log(`Initial status log created for cargo ${record.get('tracking_code')}`);
  } catch (error) {
    console.error('Error creating initial status log:', error);
  }
}, "cargos")
