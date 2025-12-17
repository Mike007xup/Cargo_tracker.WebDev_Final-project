onRecordBeforeCreateRequest((e) => {
  const record = e.record;
  const authRecord = e.httpContext.get('authRecord');

  
  if (!record.get('updated_by') && authRecord) {
    record.set('updated_by', authRecord.id);
  }
}, "cargo_status_logs")
