import VendorModel from "../models/vendor.model";
class VendorService {
    public vendors = new VendorModel
    public async createVendor(data: Object){
        await this.vendors.createNewVendor(data)
    }
}

export default VendorService