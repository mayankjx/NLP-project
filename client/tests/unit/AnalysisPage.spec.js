import { shallowMount } from "@vue/test-utils";
import Report from "../../src/components/Report.vue";

describe("Report component tests", () => {
  it("renders report props data", () => {
    const report = {
      status: "good",
    };

    const wrapper = shallowMount(Report, {
      props: {
        report,
      },
    });

    expect(wrapper.text()).toMatch(`Status: ` + report.status);
  });
});
