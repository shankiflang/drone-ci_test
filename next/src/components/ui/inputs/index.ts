import InputBoolean from './InputBoolean';
import InputDate from './InputDate';
import InputImage from './InputImage';
import InputFile from './InputFile';
import InputHash from './InputHash';
import Input from './Input';
import InputSelect from './InputSelect';
import InputWysiwyg from './InputWysiwyg';
import InputO2M from './InputO2M';
import InputSelectM2O from './InputSelectM2O';


const inputs = {
	boolean: InputBoolean,
	datetime: InputDate,
	'file-image': InputImage,
	file: InputFile,
	// files: Files,
	// 'group-accordion': GroupAccordion,
	// 'group-detail': GroupDetail,
	// 'group-raw': GroupRaw,
	// 'input-autocomplete-api': InputAutocompleteApi,
	// 'input-code': InputCode,
	'input-hash': InputHash,
	// 'input-multiline': InputMultiline,
	// 'input-rich-text-md': InputRichTextMd,
	input: Input,
	// 'list-m2a': ListM2A,
	// 'list-m2m': ListM2M,
	// 'list-o2m-tree-view': ListO2MTreeView,
	'list-o2m': InputO2M,
	// list: List,
	// map: Map,
	// 'presentation-divider': PresentationDivider,
	// 'presentation-links': PresentationLinks,
	// 'presentation-notice': PresentationNotice,
	// 'select-color': SelectColor,
	'select-dropdown-m2o': InputSelectM2O,
	// 'select-icon': SelectIcon,
	// 'select-multiple-checkbox-tree': SelectMultipleCheckboxTree,
	// 'select-multiple-checkbox': SelectMultipleCheckbox,
	'select-dropdown': InputSelect,
	// 'select-radio': SelectRadio,
	// slider: Slider,
	// tags: Tags,
	// translations: Translations,
	'extension-editorjs': InputWysiwyg,
}

export default inputs