import 'select2/dist/js/select2';

class DemoSelect2 {
  init() {
    // this.templating();
    // this.basicMultipleLimit();
    // this.clearableSelections();
    // this.basicHideSearchBox();
    // this.multiHideSearchBox();
  }

  templating = () => {
    function formatState(state) {
      if (!state.id) {
        return state.text;
      }
      var baseUrl = "https://select2.org/user/pages/images/flags";
      var $state = $(
        '<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
      );
      return $state;
    };
    $(".select2-templating-example").select2({
      templateResult: formatState,
      width: '100%'
    });
  }

  basicMultipleLimit = () => {
    $(".select2-basic-multiple-limit-example").select2({
      maximumSelectionLength: 2,
      width: '100%'
    });
  }

  clearableSelections = () => {
    $(".select2-clearable-selection-example").select2({
      minimumResultsForSearch: Infinity,
      width: '100%'
    });
  }

  basicHideSearchBox = () => {
    $(".select2-example-basic-hide-search").select2({
      minimumResultsForSearch: Infinity,
      width: '100%'
    });
  }

  multiHideSearchBox = () => {
    $('.select2-example-basic-hide-search-multi').select2({ width: '100%' });
    $('.select2-example-basic-hide-search-multi').on('select2:opening select2:closing', function(event) {
      let $searchfield = $(this).parent().find('.select2-search__field');
      $searchfield.prop('disabled', true);
    });
  }
}

new DemoSelect2().init();