import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { Button, ButtonGroup, Form, InputGroup,OverlayTrigger,Tooltip } from "react-bootstrap";
import TooltipIcon from "../../../../assets/images/tooltip.svg";
import { isMobile } from "react-device-detect";
import IconBack from "../../../../assets/images/long-arrow.svg";
import {
  goToNextStepAction,
  goToPrevStepAction,
  setDetailsAction,
} from "../../../../actions";
import { RootState } from "../../../../types/state";

const StepThree = ({ setStep }) => {
  const { t } = useTranslation("steps");
  const dispatch = useDispatch();

  const {
    prestige,
    condition,
    constructionYear,
    renovationYear,
    renovationLevel,
  } = useSelector((state: RootState) => state.stepsInfo.stepBlock.details);
  const { selectedProperty } = useSelector(
    (state: RootState) => state.stepsInfo.stepBlock
  );

  const [data, setFormData] = useState({
    prestige,
    condition,
    constructionYear,
    renovationYear,
    renovationLevel,
  });

  const [noValidRenYear, setValidRenYear] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClickPrevBtn = () => {
    // dispatch(goToPrevStepAction());
    setStep(1);
  };

  const handleClickNextBtn = () => {
    const validData = { ...data };

    if (
      checkIfValidYears(validData.constructionYear, validData.renovationYear)
    ) {
      setValidRenYear(true);
    } else {
      if (+validData.constructionYear > new Date().getFullYear()) {
        validData.constructionYear = String(new Date().getFullYear());
      }

      if (+validData.renovationYear > new Date().getFullYear()) {
        validData.renovationYear = String(new Date().getFullYear());
      }

      dispatch(setDetailsAction(validData));
      setStep(3);
    }
  };

  const handleChangeVal = (el: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...data,
      [el.target.name]: el.target.value,
    });

    if (el.target.name === "renovationLevel" && el.target.value.length === 0) {
      setFormData({
        ...data,
        [el.target.name]: "0",
      });
    }

    if (el.target.name === "renovationYear") {
      if (el.target.value.length) {
        setFormData({
          ...data,
          renovationYear:
            +el.target.value < 0
              ? +el.target.value * -1
              : +el.target.value > new Date().getFullYear()
              ? new Date().getFullYear()
              : el.target.value,
          renovationLevel: "25",
        });
      } else {
        setFormData({
          ...data,
          renovationYear: el.target.value,
          renovationLevel: "0",
        });
      }

      setValidRenYear(
        el.target.value.length > 3 &&
          checkIfValidYears(data.constructionYear, el.target.value)
      );
    }

    if (el.target.name === "constructionYear") {
      setFormData({
        ...data,
        constructionYear:
          +el.target.value < 0
            ? +el.target.value * -1
            : +el.target.value > new Date().getFullYear()
            ? new Date().getFullYear()
            : el.target.value,
      });

      setValidRenYear(
        el.target.value.length > 3 &&
          checkIfValidYears(el.target.value, data.renovationYear)
      );
    }
  };

  const selectPrestige = (el) => {
    setFormData({
      ...data,
      prestige: el.target.name,
    });
  };

  const selectCondition = (el) => {
    setFormData({
      ...data,
      condition: el.target.name,
    });
  };

  const checkIfValidYears = (constructionYear, renovationYear) => {
    return renovationYear && Number(renovationYear) < Number(constructionYear);
  };

  const checkMinValue = (name: string, value: string) => {
    setFormData({
      ...data,
      [name]:
        data[name] && Number(data[name]) < Number(value) ? value : data[name],
    });
  };

  return (
    <div className="step-three d-flex flex-column justify-content-between">
      <div>
        <span className="step-title">{t("span.step")} 3</span>
        <h4>
          <span>
            {selectedProperty === "house" ? "home" : selectedProperty}
          </span>{" "}
          details <span className="optional">({t("title.optional")})</span>
        </h4>
        <div className="group-block d-flex flex-column">
          <span className="form-label">{t("title.prestige")}</span>
          <ButtonGroup aria-label="prestige" className="custom-btn-group">
            <Button
              name="basic"
              onClick={selectPrestige}
              className={`first-btn ${
                data.prestige === "basic" ? "custom-active" : ""
              }`}
            >
              {t("button.basic")}
            </Button>
            <Button
              name="average"
              className={data.prestige === "average" ? "custom-active" : ""}
              onClick={selectPrestige}
            >
              {t("button.average")}
            </Button>
            <Button
              name="luxury"
              onClick={selectPrestige}
              className={`last-btn ${
                data.prestige === "luxury" ? "custom-active" : ""
              }`}
            >
              {t("button.luxury")}
            </Button>
          </ButtonGroup>
        </div>
        <div className="group-block d-flex flex-column">
          <span className="form-label">{t("span.condition")}</span>
          <ButtonGroup aria-label="condition" className="custom-btn-group">
            <Button
              name="renovate"
              className={`first-btn ${
                data.condition === "renovate" ? "custom-active" : ""
              }`}
              onClick={selectCondition}
            >
              {t("button.renovate")}
            </Button>
            <Button
              name="good"
              className={data.condition === "good" ? "custom-active" : ""}
              onClick={selectCondition}
            >
              {t("button.good")}
            </Button>
            <Button
              name="new"
              className={`last-btn ${
                data.condition === "new" ? "custom-active" : ""
              }`}
              onClick={selectCondition}
            >
              {t("button.new")}
            </Button>
          </ButtonGroup>
        </div>
        <Form>
          <InputGroup>
            <Form.Label className="construction-year-label">
              {t("label.construction-year")}
            </Form.Label>
            <div className="input-block">
              <Form.Control
                className="constructionYear"
                name="constructionYear"
                min={1800}
                max={new Date().getFullYear()}
                value={data.constructionYear}
                type="number"
                onBlur={() => checkMinValue("constructionYear", "1800")}
                onChange={handleChangeVal}
              />
            </div>
          </InputGroup>
          <InputGroup>
            <Form.Label className="renovation-year-label">
              {t("label.renovated")}
             
            </Form.Label>
            <div className="input-block d-flex flex-column">
              <Form.Control
                className="renovationYear"
                name="renovationYear"
                min={1920}
                max={new Date().getFullYear()}
                value={data.renovationYear}
                type="number"
                onBlur={() => checkMinValue("renovationYear", "1920")}
                onChange={handleChangeVal}
                isInvalid={noValidRenYear}
              />
              <Form.Control.Feedback type="invalid">
                {t("error.renovation-level")}
              </Form.Control.Feedback>
            </div>
          </InputGroup>
          <InputGroup>
            <Form.Label className="d-flex renovation-level-label">
              {t("label.renovation-level")}
              <span className="position-relative">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-info">{t("tooltip.renovation")}</Tooltip>
                }
              >
                <img
                  className="tooltip-info"
                  key="tooltip-info"
                  src={TooltipIcon}
                  alt="TooltipIcon"
                />
              </OverlayTrigger>
              </span>
            </Form.Label>

            <div className="input-block">
              <Form.Control
                min={0}
                name="renovationLevel"
                value={data.renovationLevel}
                type="number"
                onChange={handleChangeVal}
              />
              <InputGroup.Append>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup.Append>
            </div>
          </InputGroup>
          <InputGroup className="range">
            <InputGroup.Prepend className="prepend">
              <InputGroup.Text>0%</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="renovationLevel"
              value={data.renovationLevel}
              type="range"
              onChange={handleChangeVal}
              min={0}
              max={100}
            />
            <InputGroup.Append className="append">
              <InputGroup.Text>100%</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
      <div className="steps-btn-group d-flex justify-content-between">
        <Button onClick={handleClickPrevBtn} className="prev-step">
          <img src={IconBack} alt="IconBack" />
          {t("button.back")}
        </Button>
        <Button onClick={handleClickNextBtn} className="next-step">
          {t("button.next")}
        </Button>
      </div>
    </div>
  );
	return (
		<div className="step-three d-flex flex-column justify-content-between">
			<div>
				<span className="step-title">{t("span.step")} 3</span>
				<h4>
					<span>{selectedProperty === "house" ? "home" : selectedProperty}</span>{" "}
					details <span className="optional">({t("title.optional")})</span>
				</h4>
				<div className="group-block d-flex flex-column">
					<span className="form-label">{t("title.prestige")}</span>
					<ButtonGroup aria-label="prestige" className="custom-btn-group">
						<Button
							name="basic"
							onClick={selectPrestige}
							className={`first-btn ${data.prestige === "basic" ? "custom-active" : ""
								}`}
						>
							{t("button.basic")}
						</Button>
						<Button
							name="average"
							className={data.prestige === "average" ? "custom-active" : ""}
							onClick={selectPrestige}
						>
							{t("button.average")}
						</Button>
						<Button
							name="luxury"
							onClick={selectPrestige}
							className={`last-btn ${data.prestige === "luxury" ? "custom-active" : ""
								}`}
						>
							{t("button.luxury")}
						</Button>
					</ButtonGroup>
				</div>
				<div className="group-block d-flex flex-column">
					<span className="form-label">{t("span.condition")}</span>
					<ButtonGroup aria-label="condition" className="custom-btn-group">
						<Button
							name="renovate"
							className={`first-btn ${data.condition === "renovate" ? "custom-active" : ""
								}`}
							onClick={selectCondition}
						>
							{t("button.renovate")}
						</Button>
						<Button
							name="good"
							className={data.condition === "good" ? "custom-active" : ""}
							onClick={selectCondition}
						>
							{t("button.good")}
						</Button>
						<Button
							name="new"
							className={`last-btn ${data.condition === "new" ? "custom-active" : ""
								}`}
							onClick={selectCondition}
						>
							{t("button.new")}
						</Button>
					</ButtonGroup>
				</div>
				<Form>
					<InputGroup>
						<Form.Label className="construction-year-label">
							{t("label.construction-year")}
						</Form.Label>
						<div className="input-block">
							<Form.Control
								className="constructionYear"
								name="constructionYear"
								min={1800}
								max={new Date().getFullYear()}
								value={data.constructionYear}
								type="number"
								onBlur={() => checkMinValue("constructionYear", "1800")}
								onChange={handleChangeVal}
							/>
						</div>
					</InputGroup>
					<InputGroup>
						<Form.Label className="renovation-year-label">
							{t("label.renovated")}
						</Form.Label>
						<div className="input-block d-flex flex-column">
							<Form.Control
								className="renovationYear"
								name="renovationYear"
								min={1920}
								max={new Date().getFullYear()}
								value={data.renovationYear}
								type="number"
								onBlur={() => checkMinValue("renovationYear", "1920")}
								onChange={handleChangeVal}
								isInvalid={noValidRenYear}
							/>
							<Form.Control.Feedback type="invalid">
								{t("error.renovation-level")}
							</Form.Control.Feedback>
						</div>
					</InputGroup>
					<InputGroup>
						<Form.Label className="d-flex renovation-level-label">
							{t("label.renovation-level")}
						</Form.Label>
						
						<div className="input-block">
							<Form.Control
								min={0}
								name="renovationLevel"
								value={data.renovationLevel}
								type="number"
								onChange={handleChangeVal}
							/>
							<InputGroup.Append>
								<InputGroup.Text>%</InputGroup.Text>
							</InputGroup.Append>
						</div>
					</InputGroup>
					<InputGroup className="range">
						<InputGroup.Prepend className="prepend">
							<InputGroup.Text>0%</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							name="renovationLevel"
							value={data.renovationLevel}
							type="range"
							onChange={handleChangeVal}
							min={0}
							max={100}
						/>
						<InputGroup.Append className="append">
							<InputGroup.Text>100%</InputGroup.Text>
						</InputGroup.Append>
					</InputGroup>
				</Form>
			</div>
			<div className={isMobile? "botton-syicky steps-btn-group d-flex justify-content-between":"steps-btn-group d-flex justify-content-between" }>
				<Button onClick={handleClickPrevBtn} className="prev-step">
					<img src={IconBack} alt="IconBack" />
					{t("button.back")}
				</Button>
				<Button onClick={handleClickNextBtn} className="next-step">
					{t("button.next")}
				</Button>
			</div>
		</div>
	);
};

export default StepThree;
