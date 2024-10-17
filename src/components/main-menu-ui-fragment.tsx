import PerPageSelect from '@/components/per-page-select'
import SearchInput from '@/components/search-input'
import TagCheckboxes from '@/components/tag-checkboxes'

export default function MainMenuUiFragment() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SearchInput />

      <TagCheckboxes />

      <PerPageSelect />
    </div>
  )
}
