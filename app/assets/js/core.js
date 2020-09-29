import 'jquery';
import 'imports-loader?imports[]=default|jquery!select2'
import { Dropdown } from 'bootstrap';
window.$ = jQuery;

class CoreAdmin {
  init() {
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl)
    })
    $('[data-toggle="tooltip"]').tooltip();  
  }
}

window.coreAdmin = new CoreAdmin();
window.coreAdmin.init();
