onRecordBeforeCreateRequest((e) => {
  const record = e.record;

  
  if (!record.get('tracking_code')) {
    
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let random = '';
    for (let i = 0; i < 6; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    record.set('tracking_code', `CARGO-${date}-${random}`);
  }

  
  const admin = e.httpContext.get('admin'); 
  const authRecord = e.httpContext.get('authRecord'); 
  
  if (!record.get('created_by') && authRecord) {
    record.set('created_by', authRecord.id);
  }
}, "cargos")
