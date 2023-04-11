import VendorModel from "../models/vendor.model";

class VendorService {
    public vendors = new VendorModel
    public async createVendor(data: Object){
        await this.vendors.createNewVendor(data)
    }
   public async getVendorProfile (id: number) {
    const data = await this.vendors.findVendor(id)
    return data
   }
   public async deleteVendor (id: number) {
    await this.vendors.deleteVendor(id)
   }
}

export default VendorService