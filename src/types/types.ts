export interface RootState {
    data: object | null; 
  }
  export interface ImportDataAction {
    type: string;
    jsonData: object;
  }
  export interface ChartNode {
    label: string;
    children: (ChartNode | string)[];
  }
  export interface FileInputProps {
    showTreeView: boolean
    setShowTreeView: any
}
export interface DataBlock {
  title: string;
  statsInfo: { title: string; info: any }[];
}
export interface ImportState {
  data: {
      player: {
          name: string,
          playerInfo: DataBlock[];
      };
  } | null
}

