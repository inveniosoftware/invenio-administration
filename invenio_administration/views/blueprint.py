# SPDX-FileCopyrightText: 2025 Northwestern University.
# SPDX-License-Identifier: MIT

"""Administration blueprint."""


def get_administration_panel_bp(app):
    """Get administration panel blueprint.

    For historical reasons the blueprint was created in `InvenioAdministration`
    and this just fetches it to be registered.
    """
    ext = app.extensions["invenio-administration"]
    return ext.administration.blueprint
