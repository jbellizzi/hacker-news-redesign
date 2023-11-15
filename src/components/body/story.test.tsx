import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { StoryComponent } from "./story";
import { Job, Poll, Story } from "../../redux/types";
import dayjs from "dayjs";

const mockStory: Story = {
  by: "ggpsv",
  descendants: 73,
  id: 38276951,
  kids: [
    38277992, 38277646, 38277322, 38277380, 38277340, 38277940, 38277385, 38278100, 38277344, 38278103, 38277834,
    38277302, 38277543, 38277924, 38277691, 38277681, 38277375, 38277800, 38277580, 38277534, 38277629, 38278123,
    38277797, 38277316, 38277698, 38277422, 38278010, 38277386, 38277516, 38277381, 38277615, 38277956, 38277939,
    38277460,
  ],
  score: 181,
  time: 1700058696,
  title: "The Small Website Discoverability Crisis",
  type: "story",
  url: "https://www.marginalia.nu/log/19-website-discoverability-crisis/",
};

const mockJob: Job = {
  by: "mmcclure",
  id: 38275791,
  time: 1700049649,
  title: "Mux (YC W16) Is Hiring a Senior Distributed Systems Engineer",
  type: "job",
  url: "https://mux.com/jobs?j=dse",
};

const mockPoll: Poll = {
  by: "GreekOphion",
  descendants: 570,
  id: 3746692,
  kids: [
    3746863, 3746877, 3747817, 3751351, 3747920, 3746808, 3746992, 3746834, 3747062, 3747148, 3746857, 3746843, 3748125,
    3747223, 3746967, 3747785, 3749471, 3748281, 3746889, 3746850, 3746935, 3746812, 3746852, 3747013, 3747731, 3747175,
    3747234, 3749618, 3746823, 3747388, 3749803, 3747482, 3748048, 3749470, 3747627, 3747696, 3746936, 3746881, 3747721,
    3801444, 3748826, 3748909, 3747059, 3748564, 3748192, 3749692, 3747293, 3747214, 3746976, 3748341, 3747043, 3747665,
    3747629, 3747215, 3747904, 3751272, 3748479, 3746840, 3748052, 3752575, 3747469, 3749152, 3747058, 3747099, 3747485,
    3747726, 3748666, 3747727, 3747185, 3749790, 3747887, 3747453, 3747224, 3747722, 3750122, 3749276, 3748256, 3752331,
    3748091, 3748667, 3750117, 3748632, 3747472, 3747077, 3748572, 3747265, 3747915, 3746868, 3747273, 3747083, 3747117,
    3776060, 3747811, 3749170, 3748737, 3747304, 3752328, 3747069, 3749167, 3750588, 3748312, 3749539, 3747587, 3747055,
    3748578, 3747123, 3747422, 3751098, 3748007, 3747484, 3747706, 3748519, 3746969, 3746906, 3747197, 3746961, 3747018,
    3748927, 3747275, 3747212, 3747610, 3748569, 3747604, 3750251, 3747143, 3752247, 3747661, 3747064, 3747258, 3748625,
    3749265, 3751343, 3751619, 3750433, 3747331, 3747458, 3748732, 3747333, 3747187, 3747432, 3746919, 3750466, 3748865,
    3747913, 3746995, 3747166, 3747026, 3751034, 3752293, 3749518, 3747466, 3747834, 3750810, 3747423, 3747715, 3746999,
    3752388, 3749574, 3748932, 3755519, 3748253, 3748338, 3749430, 3748870, 3749929, 3749630, 3748669, 3747418, 3746954,
    3748613, 3748096, 3747660, 3752728, 3748135, 3751907, 3749069, 3778796, 3748601, 3747991, 3747980, 3746899, 3747853,
    3747566, 3750516, 3751438, 3748238, 3747910, 3747357, 3752992, 3749348, 3749279, 3749244, 3748741, 3748681, 3748447,
    3748407, 3748327, 3748023, 3747786, 3747763, 3747757, 3747724, 3747580, 3747565, 3747447, 3747395, 3747380, 3747324,
    3747100, 3747034, 3748703, 3748621, 3747861, 3747950, 3748623, 3755563, 3747150, 3747106, 3746878, 3746842, 3747894,
    3749858, 3747494, 3747923, 3748481, 3748920, 3747130, 3747124, 3748114, 3747622, 3747644, 3747687, 3749049, 3755018,
    3746940, 3747109, 3747957, 3749032, 3746944, 3746957, 3747010, 3747233, 3746920, 3746950, 3746939, 3746891,
  ],
  parts: [
    3746693, 3746694, 3746695, 3746696, 3746697, 3746698, 3746699, 3746700, 3746701, 3746702, 3746703, 3746704, 3746705,
    3746706, 3746707, 3746708, 3746709, 3746710, 3746711, 3746712, 3746713, 3746714, 3746715, 3746716, 3746717, 3746718,
    3746719, 3746720, 3746721, 3746722, 3746723, 3746724, 3746725, 3746726, 3746727, 3746728, 3747384,
  ],
  score: 2423,
  text: "What's your favortie programming langauge?<p>Below are the most popular languages. If your favorite isn't below select other and comment what it is below.<p>Note: By voting for a language you are not up voting this poll. Please up vote this poll to keep it alive.",
  time: 1332530377,
  title: "Poll: What's Your Favorite Programming Language?",
  type: "poll",
};

describe("StoryComponent", () => {
  const timestamp = dayjs(new Date()).subtract(4, "hours").unix();

  test("renders story", () => {
    render(<StoryComponent story={{ ...mockStory, time: timestamp }} />);

    const title = screen.getByText("The Small Website Discoverability Crisis");
    expect(title).toBeTruthy();
    expect(title.getAttribute("href")).toEqual("https://www.marginalia.nu/log/19-website-discoverability-crisis/");

    expect(screen.getByText("marginalia.nu", { exact: false })).toBeTruthy();
    expect(screen.getByText("181 points by ggpsv 4 hours ago | 73 comments", { exact: false })).toBeTruthy();

    expect(screen.getByAltText("save-empty")).toBeTruthy();
    expect(screen.getByText("save")).toBeTruthy();
  });

  test("renders job", () => {
    render(<StoryComponent story={{ ...mockJob, time: timestamp }} />);

    const title = screen.getByText("Mux (YC W16) Is Hiring a Senior Distributed Systems Engineer");
    expect(title).toBeTruthy();
    expect(title.getAttribute("href")).toEqual("https://mux.com/jobs?j=dse");

    expect(screen.getByText("mux.com", { exact: false })).toBeTruthy();
    expect(screen.queryByText("points", { exact: false })).toBeFalsy();
    expect(screen.queryByText("by", { exact: false })).toBeFalsy();
    expect(screen.getByText("4 hours ago |", { exact: false })).toBeTruthy();

    expect(screen.getByAltText("save-empty")).toBeTruthy();
    expect(screen.getByText("save")).toBeTruthy();
  });

  test("renders poll", () => {
    render(<StoryComponent story={{ ...mockPoll, time: timestamp }} />);

    const title = screen.getByText("Poll: What's Your Favorite Programming Language?");
    expect(title).toBeTruthy();
    expect(title.getAttribute("href")).toEqual(`https://news.ycombinator.com/item?id=${mockPoll.id}`);

    expect(screen.getByText("2423 points by GreekOphion 4 hours ago | 570 comments", { exact: false })).toBeTruthy();

    expect(screen.getByAltText("save-empty")).toBeTruthy();
    expect(screen.getByText("save")).toBeTruthy();
  });
});
