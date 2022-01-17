// replace your-folder below with the folder for which you want a listing
//PropertiesService.getUserProperties().deleteProperty('CONTINUATION_TOKEN')  //reset test
var user_properties = PropertiesService.getUserProperties()
var cont_token = user_properties.getProperty('CONTINUATION_TOKEN')
console.log(user_properties.getProperty('CONTINUATION_TOKEN'))

function listFolderContents() {
  var t = new Date()

  function isTimeUp(t){
    var now = new Date();
    return now.getTime() - t.getTime() > 29*60*1000; //1 minutes * 10 seconds * 1000 miliseconds
  }

  if (cont_token==null){
    //first time execution
    let ss = SpreadsheetApp.getActiveSpreadsheet()
    let parent_folder = DriveApp.getFileById(ss.getId()).getParents().next().getId()
    console.log(parent_folder)
    var folder = DriveApp.getFolderById(parent_folder)
    var contents = folder.getFiles();

    var sheet = ss.getActiveSheet();
    //clear sheet contents
    sheet.clearContents()  
    sheet.appendRow(['name']);
  } else {
    let ss = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getActiveSheet();
    var contents = DriveApp.continueFileIterator(cont_token)
  }

  var file;
  var name;
  while(contents.hasNext()) {
    if (isTimeUp(t)) {
        user_properties.setProperty('CONTINUATION_TOKEN', contents.getContinuationToken())
        console.log(user_properties.getProperty('CONTINUATION_TOKEN'))
        break
    } else {
      file = contents.next();
      name = file.getName();
      sheet.appendRow([name]);   
    }  
  }
  if (contents.hasNext()){
  } else {
    console.log('Finito!')
    PropertiesService.getUserProperties().deleteProperty('CONTINUATION_TOKEN')  
  }
};
