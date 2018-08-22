
export const ProductWarehouseModel = {
    id: -1,
    productId: -1,
    warehouseId: -1,
    initQuantity: -1,
    minInventory: -1,
    maxInventory: -1,
    inventory: -1,
    rackCode: '',
    layerNum: -1,
    placeNum: -1,
};

export const ProductModel = {
    id: -1,
    code: '',
    name: '',
    categoryId: -1,
    specification: '',
    supplierId: -1,
    unitId: -1,
    preferredWarehouseId: -1,
    parameter: '',
    device: '',
    remark: '',
    active: 1,
    prodWh: {...ProductWarehouseModel}
}

