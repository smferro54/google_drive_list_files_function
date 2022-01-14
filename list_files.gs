// replace your-folder below with the folder for which you want a listing
function listFolderContents() {
  
  let ss = SpreadsheetApp.getActiveSpreadsheet()
  let parent_folder = DriveApp.getFileById(ss.getId()).getParents().next().getName()
  var folders = DriveApp.getFoldersByName(parent_folder)
  var folder = folders.next();
  var contents = folder.getFiles();

  var sheet = ss.getActiveSheet();
  //clear sheet contents
  sheet.clearContents()  
  sheet.appendRow( ['name', 'link'] );
  
  var file;
  var name;
  var link;
  while(contents.hasNext()) {
    file = contents.next();
    name = file.getName();
    link = file.getUrl();
    sheet.appendRow( [name, link] );     
  }  
};
