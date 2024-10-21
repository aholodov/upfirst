import PerPageSelect from '@/components/per-page-select'
import SearchInput from '@/components/search-input'
import TagCheckboxes from '@/components/tag-checkboxes'
import queryParams from '@/constants/query-param-keys'
import { parseAuthor, createAuthorValue } from '@/lib/author-tag'

export default function MainMenuUiFragment() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SearchInput
        paramKey={queryParams.query}
        label="Search"
      />

      <SearchInput
        paramKey={queryParams.tagsAnd}
        label="Author"
        getInputValue={parseAuthor}
        setParamValue={createAuthorValue}
      />

      <TagCheckboxes />

      <PerPageSelect />
    </div>
  )
}
