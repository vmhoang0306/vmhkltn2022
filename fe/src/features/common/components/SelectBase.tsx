import { Select } from "antd";
const { Option } = Select;

interface DepartmentProps {
  onChange?: (val: any) => void;
  placeholder?: string;
  defVal?: string;
  isShowChooseAll?: boolean;
  data: { value: any, title: any }[];
  requesting?: boolean;
}
function SelectDepartment(props: DepartmentProps) {
  const { placeholder, onChange, data, requesting, isShowChooseAll = true, defVal } = props;
  return (
    <div>
      <Select
        showSearch
        className="w-100 min-width-100px"
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        notFoundContent={null}
        loading={requesting}
        onChange={onChange}
        defaultValue={defVal}
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {isShowChooseAll && (
          <Option key={undefined} value={undefined}>
            Tất cả
          </Option>
        )}
        {data?.map((item) => (
          <Option value={item.value} key={item.value}>
            {item.title}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectDepartment;
