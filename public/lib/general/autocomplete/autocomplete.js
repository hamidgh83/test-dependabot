function setAutoComplete(element, appendedContainer, source) {
    $(element).devbridgeAutocomplete({
        lookup: source,
        minChars: 1,
        showNoSuggestionNotice: true,
        noSuggestionNotice: $('input[name="autocomplete_no_match_result"]').val(),
        appendTo: appendedContainer
    });
}

function setAjaxAutocomplete(element, source, url, usedSchoolId, onSearchStart, callback) {
    let suggestions;
       return $(element).devbridgeAutocomplete({
        minChars: 1,
        showNoSuggestionNotice: true,
        noSuggestionNotice: $('input[name="autocomplete_no_match_result"]').val(),
        serviceUrl: url,
        searchContain: true,
        deferRequestBy: 1000,
        type: 'post',
        ajaxSettings: {
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        },
        onSearchStart: function(params) {
            onSearchStart(params, $(this));
        },
        onSearchComplete: function(query, data) {
            suggestions = data;
            callback(null, suggestions)
        },
        dataType: 'json',
        onSelect: function (selected) {
            callback(selected, suggestions)
        },
        transformResult: function (response) {
            return response;
        }
    });
}

/**
 * Set Data for autoComplete
 * */
function setData(data) {
    let arr = [];
    $.map(data, function (value, key) {
        arr.push({value: value, data: key})
    });
    return arr;
}
