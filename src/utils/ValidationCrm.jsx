function ValidationCrm(crm){
    const regex = /^\d{5,}(-|\/)(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/;
    return regex.test(crm.toUpperCase())
}

export default ValidationCrm;
