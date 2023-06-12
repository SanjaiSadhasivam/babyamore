import React, { useEffect, useState } from "react";
// import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TreeItem from '@mui/lab/TreeItem';

import "./TreeView.css";

const TreeViewPage = () => {



    return (
        <>
            {/* <div className="Treeview-total-page">
                <h3 className="Treeview-heaing">Tree View</h3>
                <div className="TreeView-content-page">
                    <TreeView
                        aria-label="multi-select"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        multiSelect
                        sx={{ height: 316, flexGrow: 1, maxWidth: 1200, overflowY: 'auto' }}
                    >
                        <TreeItem nodeId="1" label="Main Category 1">
                            <TreeItem nodeId="2" label="Sub Category 1" >
                                <TreeItem nodeId="3" label="Child Category 1"></TreeItem>
                                <TreeItem nodeId="4" label="Child Category 2"></TreeItem>
                            </TreeItem>

                            <TreeItem nodeId="5" label="Sub Category 2">
                                <TreeItem nodeId="6" label="Child Category 1"></TreeItem>
                                <TreeItem nodeId="7" label="Child Category 2"></TreeItem>
                                <TreeItem nodeId="8" label="Child Category 3"></TreeItem>
                            </TreeItem>
                            <TreeItem nodeId="9" label="Sub Category 3">
                                <TreeItem nodeId="10" label="Child Category 1"></TreeItem>
                            </TreeItem>
                        </TreeItem>

                        <TreeItem nodeId="11" label="Main Category 2">
                            <TreeItem nodeId="12" label="Sub Category 1">
                                <TreeItem nodeId="13" label="Child Category 1"></TreeItem>
                                <TreeItem nodeId="14" label="Child Category 2"></TreeItem>
                                <TreeItem nodeId="15" label="Child Category 3"></TreeItem>
                            </TreeItem>
                            <TreeItem nodeId="16" label="Sub Category 2" />

                        </TreeItem>

                        <TreeItem nodeId="17" label="Main Category 3">
                            <TreeItem nodeId="18" label="Sub Category 1">
                                <TreeItem nodeId="19" label="Child Category 1"></TreeItem>
                                <TreeItem nodeId="20" label="Child Category 2"></TreeItem>
                            </TreeItem>
                            <TreeItem nodeId="21" label="Sub Category 2" />
                        </TreeItem>

                        <TreeItem nodeId="22" label="Main Category 4">
                        <TreeItem nodeId="23" label="Sub Category 1">
                                <TreeItem nodeId="24" label="Child Category 1"></TreeItem>
                                <TreeItem nodeId="25" label="Child Category 2"></TreeItem>
                                <TreeItem nodeId="25" label="Child Category 3"></TreeItem>
                                <TreeItem nodeId="25" label="Child Category 4"></TreeItem>
                            </TreeItem>
                        </TreeItem>


                    </TreeView>
                </div>
                
            </div> */}
        </>
    )
};

export default TreeViewPage;
