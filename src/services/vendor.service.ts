import VendorModel from "../models/vendor.model";

class VendorService {
    public vendors = new VendorModel()
    public async createVendor(data: Object){
        await this.vendors.createNewVendor(data)
    }
   public async getVendorProfile (id: number, returnOnlyEmails?:boolean ) {
    const data = await this.vendors.findVendor(id, returnOnlyEmails)
    return data
   }
   public async deleteVendor (id: number) {
    await this.vendors.deleteVendor(id)
   }
   public async updateVendorProductsCount (id: number) {
    await this.vendors.updateVendorProductsCount(id)
   }
   public async getVendorUserEmails(ids: number[]) {
    const emails = [];
    for (const el of ids) {
      const email: any = await this.vendors.findVendor(el, true);
      emails.push(email[0]?.email);
    }
    return emails;
  }

}

export default VendorService